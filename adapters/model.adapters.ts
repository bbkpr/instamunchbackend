import {
  Machine as PrismaMachine,
  MachineItem as PrismaMachineItem,
  Item as PrismaItem,
  Location as PrismaLocation,
  MachineLocation as PrismaMachineLocation, Prisma
} from '@prisma/client';
import {
  Machine,
  MachineItem,
  Item,
  Location,
  MachineLocation
} from '../generated/graphql';
import { DefaultArgs, GetResult } from '@prisma/client/runtime/library';

// Relationship types
type PrismaMachineWithRelations = PrismaMachine & {
  machineItems: (PrismaMachineItem & {
    item: PrismaItem
  })[];
  machineLocation?: PrismaMachineLocation & {
    location: PrismaLocation
  };
};

type PrismaMachineItemWithRelations = PrismaMachineItem & {
  machine: PrismaMachine;
  item: PrismaItem;
};

type PrismaMachineLocationWithRelations = PrismaMachineLocation & {
  machine: PrismaMachine;
  location: PrismaLocation;
};

// Adapters
export const adaptLocation = (prismaLocation: PrismaLocation): Location => ({
  id: prismaLocation.id,
  address1: prismaLocation.address1,
  address2: prismaLocation.address2 ?? undefined,
  city: prismaLocation.city,
  stateOrProvince: prismaLocation.stateOrProvince,
  country: prismaLocation.country,
  createdAt: prismaLocation.createdAt.toISOString(),
  updatedAt: prismaLocation.updatedAt.toISOString()
});

export const adaptMachineLocation = (
  prismaMachineLocation: PrismaMachineLocation | PrismaMachineLocationWithRelations
): MachineLocation => <MachineLocation>({
  id: prismaMachineLocation.id,
  name: prismaMachineLocation.name,
  // machine: adaptMachine({prismaMachineLocation machine, items: [] }),
  // location: adaptLocation(prismaMachineLocation.location!),
  createdAt: prismaMachineLocation.createdAt.toISOString(),
  updatedAt: prismaMachineLocation.updatedAt.toISOString()
});

// Updated to include machineLocation
export const adaptMachine = (prismaMachine: PrismaMachineWithRelations): Machine => ({
  id: prismaMachine.id,
  name: prismaMachine.name ?? undefined,
  machineItems: prismaMachine.machineItems.map(item => ({
    id: item.id,
    name: item.name ?? undefined,
    itemId: item.itemId,
    item: adaptItem(item.item),
    machineId: prismaMachine.id
  })),
  createdAt: prismaMachine.createdAt.toISOString(),
  updatedAt: prismaMachine.updatedAt.toISOString()
});

// Existing Item and MachineItem adapters remain unchanged
export const adaptItem = (prismaItem: PrismaItem): Item => ({
  id: prismaItem.id,
  name: prismaItem.name ?? undefined,
  basePrice: prismaItem.basePrice ?? undefined,
  expirationPeriod: prismaItem.expirationPeriod ?? undefined,
  createdAt: prismaItem.createdAt.toISOString(),
  updatedAt: prismaItem.updatedAt.toISOString(),
});

export const adaptMachineItem = (prismaMachineItem: PrismaMachineItemWithRelations): MachineItem => ({
  id: prismaMachineItem.id,
  name: prismaMachineItem.name ?? undefined,
  machineId: prismaMachineItem.machineId,
  machine: {
    id: prismaMachineItem.machine.id,
    name: prismaMachineItem.machine.name ?? undefined,
    createdAt: prismaMachineItem.machine.createdAt.toISOString(),
    updatedAt: prismaMachineItem.machine.updatedAt.toISOString(),
  },
  itemId: prismaMachineItem.itemId,
  item: adaptItem(prismaMachineItem.item)
});
