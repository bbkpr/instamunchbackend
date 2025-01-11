// utils/permissions.ts
import { Permission, Role } from '../../generated/graphql';

export const ROLE_PERMISSIONS = {
  TECHNICIAN: [
    'READ_ITEMS',
    'READ_MACHINES',
    'UPDATE_MACHINE_ITEMS',
    'READ_LOCATIONS'
  ],

  OPERATOR: [
    // Includes all TECHNICIAN permissions
    'READ_ITEMS',
    'READ_MACHINES',
    'UPDATE_MACHINE_ITEMS',
    'READ_LOCATIONS',
    // OPERATOR specific permissions
    'CREATE_ITEMS',
    'UPDATE_ITEMS',
    'UPDATE_MACHINE_PRICES',
    'CREATE_MACHINES',
    'UPDATE_MACHINES'
  ],

  ADMINISTRATOR: [
    // Has all permissions
    'READ_ITEMS',
    'READ_MACHINES',
    'UPDATE_MACHINE_ITEMS',
    'READ_LOCATIONS',
    'CREATE_ITEMS',
    'UPDATE_ITEMS',
    'UPDATE_MACHINE_PRICES',
    'CREATE_MACHINES',
    'UPDATE_MACHINES',
    'DELETE_ITEMS',
    'DELETE_MACHINES',
    'MANAGE_LOCATIONS',
    'MANAGE_MACHINE_TYPES',
    'MANAGE_MANUFACTURERS'
  ]
} as const;

export function hasPermission(userRole: Role, requiredPermission: Permission): boolean {
  return ROLE_PERMISSIONS[userRole].includes(requiredPermission as unknown as any);
}