import {
  Machine as PrismaMachine,
  MachineItem as PrismaMachineItem,
  Item as PrismaItem,
  Location as PrismaLocation,
  MachineLocation as PrismaMachineLocation
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
  items: (PrismaMachineItem & {
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
  prismaMachineLocation: PrismaMachineLocationWithRelations
): MachineLocation => <MachineLocation>({
  id: prismaMachineLocation.id,
  name: prismaMachineLocation.name,
  machine: adaptMachine(prismaMachineLocation.machine),
  location: adaptLocation(prismaMachineLocation.location),
  createdAt: prismaMachineLocation.createdAt.toISOString(),
  updatedAt: prismaMachineLocation.updatedAt.toISOString()
});

// Updated to include machineLocation
export const adaptMachine = (prismaMachine: PrismaMachineWithRelations): Machine => ({
  id: prismaMachine.id,
  name: prismaMachine.name ?? undefined,
  items: prismaMachine.items.map(item => ({
    id: item.id,
    name: item.name ?? undefined,
    item: adaptItem(item.item)
  })),
  machineLocation: prismaMachine.machineLocation
    ? adaptMachineLocation(prismaMachine.machineLocation)
    : undefined,
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
  updatedAt: prismaItem.updatedAt.toISOString()
});

export const adaptMachineItem = (prismaMachineItem: PrismaMachineItemWithRelations): MachineItem => ({
  id: prismaMachineItem.id,
  name: prismaMachineItem.name ?? undefined,
  machine: {
    id: prismaMachineItem.machine.id,
    name: prismaMachineItem.machine.name ?? undefined,
    createdAt: prismaMachineItem.machine.createdAt.toISOString(),
    updatedAt: prismaMachineItem.machine.updatedAt.toISOString()
  },
  item: adaptItem(prismaMachineItem.item)
});