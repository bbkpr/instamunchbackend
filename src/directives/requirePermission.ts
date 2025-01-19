import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { GraphQLError, GraphQLSchema } from 'graphql';
import { hasPermission } from '../util/permissions';
import { Role, User } from '../../generated/graphql';
import { InstaMunchContext } from '../graphql/context';

interface PermissionErrorExtensions {
  code: string;
  http: { status: number };
  permission: string;
  requiredRole: string;
  userRole: Role;
}

export function requirePermissionDirective(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const requirePermission = getDirective(schema, fieldConfig, 'requirePermission')?.[0];

      if (requirePermission) {
        const { resolve: originalResolve } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context: InstaMunchContext, info) {
          const user = context.user;

          if (!user) {
            throw new GraphQLError('Authentication required', {
              extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
                permission: requirePermission.permission,
                requiredRole: requirePermission.permission
              }
            });
          }

          if (!hasPermission(user.role, requirePermission.permission)) {
            throw new GraphQLError('Permission denied', {
              extensions: {
                code: 'FORBIDDEN',
                http: { status: 403 },
                permission: requirePermission.permission,
                requiredRole: requirePermission.permission,
                userRole: user.role
              }
            });
          }

          return originalResolve!.call(this, source, args, context, info);
        };
      }
      return fieldConfig;
    },
  });
}