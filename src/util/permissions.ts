// utils/permissions.ts
import { Permission, Role } from '../../generated/graphql';

const technicianPerms = [
  'CREATE_MACHINE_ITEMS',
  'DELETE_MACHINE_ITEMS',
  'READ_ITEMS',
  'READ_LOCATIONS',
  'READ_MACHINE_ITEMS',
  'READ_MACHINE_LOCATIONS',
  'READ_MACHINE_MANUFACTURERS',
  'READ_MACHINE_TYPES',
  'READ_MACHINES',
  'READ_USERS',
  'UPDATE_MACHINE_ITEMS'
];
const operatorPerms = [
  ...technicianPerms,
  'CREATE_ITEMS',
  'CREATE_MACHINES',
  'UPDATE_ITEMS',
  'UPDATE_MACHINES',
  'UPDATE_MACHINE_PRICES',
  'UPDATE_USERS'
];

const adminPerms = [
  ...operatorPerms,
  'CREATE_LOCATIONS',
  'CREATE_MACHINE_LOCATIONS',
  'CREATE_MACHINE_MANUFACTURERS',
  'CREATE_MACHINE_TYPES',
  'CREATE_USERS',
  'DELETE_ITEMS',
  'DELETE_LOCATIONS',
  'DELETE_MACHINE_LOCATIONS',
  'DELETE_MACHINE_MANUFACTURERS',
  'DELETE_MACHINE_TYPES',
  'DELETE_MACHINES',
  'DELETE_USERS',
  'UPDATE_LOCATIONS',
  'UPDATE_MACHINE_LOCATIONS',
  'UPDATE_MACHINE_MANUFACTURERS',
  'UPDATE_MACHINE_TYPES'
];
export const ROLE_PERMISSIONS = {
  TECHNICIAN: technicianPerms,
  OPERATOR: operatorPerms,
  ADMINISTRATOR: adminPerms
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