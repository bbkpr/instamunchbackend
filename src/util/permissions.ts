// utils/permissions.ts
import { Permission, Role } from '../../generated/graphql';

export const ROLE_PERMISSIONS = {
  TECHNICIAN: [
    'READ_ITEMS',
    'READ_LOCATIONS',
    'READ_MACHINES',
    'UPDATE_MACHINE_ITEMS',
  ],

  OPERATOR: [
    // Includes all TECHNICIAN permissions
    'READ_ITEMS',
    'READ_LOCATIONS',
    'READ_MACHINES',
    'UPDATE_MACHINE_ITEMS',
    // OPERATOR specific permissions
    'CREATE_ITEMS',
    'CREATE_MACHINES',
    'UPDATE_ITEMS',
    'UPDATE_MACHINE_PRICES',
    'UPDATE_MACHINES',
  ],

  ADMINISTRATOR: [
    // Has all permissions
    'CREATE_ITEMS',
    'CREATE_MACHINES',
    'DELETE_ITEMS',
    'DELETE_MACHINES',
    'MANAGE_LOCATIONS',
    'MANAGE_MACHINE_TYPES',
    'MANAGE_MANUFACTURERS',
    'READ_ITEMS',
    'READ_LOCATIONS',
    'READ_MACHINES',
    'UPDATE_ITEMS',
    'UPDATE_MACHINE_ITEMS',
    'UPDATE_MACHINE_PRICES',
    'UPDATE_MACHINES',
  ]
} as const;

export function hasPermission(userRole: Role, requiredPermission: Permission): boolean {
  return ROLE_PERMISSIONS[userRole].includes(requiredPermission as unknown as any);
}

export function parsePermission(permissionStr: string): Permission {
  // Check if the string exists as a key in Permission enum
  if (Object.values(Permission).includes(permissionStr as Permission)) {
    return permissionStr as Permission;
  }
  throw new Error(`Invalid permission: ${permissionStr}`);
}