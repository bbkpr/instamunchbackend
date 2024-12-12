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

export type ItemWithDates = Omit<Item, 'createdAt' | 'updatedAt'> & { createdAt: Date, updatedAt: Date};

// Adapters
export const adaptLocation = (prismaLocation: PrismaLocation): Location => ({
  id: prismaLocation.id,
  address1: prismaLocation.address1,
  address2: prismaLocation.address2 ?? null,
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
  name: prismaMachine.name!,
  machineItems: prismaMachine.machineItems.map(item => ({
    id: item.id,
    name: item.name,
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
  name: prismaItem.name!,
  basePrice: prismaItem.basePrice ?? null,
  expirationPeriod: prismaItem.expirationPeriod ?? null,
  createdAt: prismaItem.createdAt.toISOString(),
  updatedAt: prismaItem.updatedAt.toISOString(),
});

export const adaptItemWithDates = (prismaItem: PrismaItem): ItemWithDates => ({
  id: prismaItem.id,
  name: prismaItem.name!,
  basePrice: prismaItem.basePrice ?? null,
  expirationPeriod: prismaItem.expirationPeriod ?? null,
  createdAt: prismaItem.createdAt,
  updatedAt: prismaItem.updatedAt,
});

export const adaptMachineItem = (prismaMachineItem: PrismaMachineItemWithRelations): MachineItem => ({
  id: prismaMachineItem.id,
  name: prismaMachineItem.name ?? null,
  machineId: prismaMachineItem.machineId,
  machine: {
    id: prismaMachineItem.machine.id,
    name: prismaMachineItem.machine.name!,
    createdAt: prismaMachineItem.machine.createdAt.toISOString(),
    updatedAt: prismaMachineItem.machine.updatedAt.toISOString(),
  },
  itemId: prismaMachineItem.itemId,
  item: adaptItem(prismaMachineItem.item)
});
