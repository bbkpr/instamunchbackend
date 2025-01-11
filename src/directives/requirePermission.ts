// directives/requirePermission.ts
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import { hasPermission } from '../util/permissions';

export function requirePermissionDirective(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const requirePermission = getDirective(schema, fieldConfig, 'requirePermission')?.[0];

      if (requirePermission) {
        const { resolve: originalResolve } = fieldConfig;

        fieldConfig.resolve = async function(source, args, context, info) {
          const { user } = context;

          if (!user) {
            throw new Error('Authentication required');
          }

          if (!hasPermission(user.role, requirePermission.permission)) {
            return {
              code: '403',
              success: false,
              message: 'Permission denied',
              permissionDenied: true
            };
          }

          return originalResolve!.call(this, source, args, context, info);
        };
      }
      return fieldConfig;
    }
  });
}