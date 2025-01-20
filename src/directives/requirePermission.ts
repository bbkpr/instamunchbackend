import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { GraphQLError, GraphQLSchema } from 'graphql';
import { hasPermission, parsePermission, ROLE_PERMISSIONS } from '../util/permissions';
import { InstaMunchContext } from '../graphql/context';

export function requirePermissionDirective(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const requirePermission = getDirective(schema, fieldConfig, 'requirePermission')?.[0];

      if (requirePermission) {
        const { resolve: originalResolve } = fieldConfig;

        fieldConfig.resolve = async function(source, args, context: InstaMunchContext, info) {
          const user = context.user;
          const { permissions, operator = 'AND' } = requirePermission as { permissions: string[], operator: 'AND' | 'OR'};

          if (!user) {
            throw new GraphQLError('Authentication required', {
              extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
                operator,
                requiredPermissions: permissions,
              }
            });
          }

          const hasRequiredPermissions = operator === 'AND'
            ? permissions.every(permission => hasPermission(user.role, parsePermission(permission)))
            : permissions.some(permission => hasPermission(user.role, parsePermission(permission)));

          if (!hasRequiredPermissions) {
            throw new GraphQLError('Permission denied', {
              extensions: {
                code: 'FORBIDDEN',
                http: { status: 403 },
                operator,
                permissions: ROLE_PERMISSIONS[user.role],
                requiredPermissions: permissions,
                userRole: user.role
              }
            });
          }

          return originalResolve!.call(this, source, args, context, info);
        };
      }
      return fieldConfig;
    }
  });
}