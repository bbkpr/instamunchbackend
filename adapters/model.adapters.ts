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
  MachineLocation, Maybe
} from '../generated/graphql';
import {
  DateTimeStamps,
  StringTimeStamps,
  timestampToISOString, WithDateTimeStamps,
  WithStringTimeStamps,
  WithTimeStamps
} from '../util/typeguards';

// Relationship types
type PrismaMachineWithRelations = WithTimeStamps<PrismaMachine> & {
  machineItems: (PrismaMachineItem & {
    item: WithTimeStamps<PrismaItem>
  })[];
  machineLocation?: PrismaMachineLocation & {
    location: WithTimeStamps<PrismaLocation>
  };
};

type PrismaMachineItemWithRelations = PrismaMachineItem & {
  machine: PrismaMachine;
  item: WithTimeStamps<PrismaItem>;
};

type PrismaMachineLocationWithRelations = PrismaMachineLocation & {
  machine: WithTimeStamps<PrismaMachine>;
  location: WithTimeStamps<PrismaLocation>;
};

export type ItemWithDates = Omit<Item, 'createdAt' | 'updatedAt'> & { createdAt: Date, updatedAt: Date };

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

export const adaptMachine = (prismaMachine: PrismaMachineWithRelations): Machine => ({
  id: prismaMachine.id,
  name: prismaMachine.name!,
  machineItems: prismaMachine.machineItems.map(machineItem => ({
    id: machineItem.id,
    name: machineItem.name,
    itemId: machineItem.itemId,
    item: {
      id: machineItem.item.id,
      name: machineItem.item.name!,
      basePrice: machineItem.item.basePrice || 3,
      expirationPeriod: machineItem.item.expirationPeriod || '90',
      createdAt: timestampToISOString(machineItem.item.createdAt),
      updatedAt: timestampToISOString(machineItem.item.updatedAt)
    },
    machineId: prismaMachine.id
  })),
  createdAt: timestampToISOString(prismaMachine.createdAt),
  updatedAt: timestampToISOString(prismaMachine.updatedAt)
});

export const adaptItemWithTimestamps = (prismaItem: WithTimeStamps<PrismaItem>): WithTimeStamps<Item> => ({
  id: prismaItem.id,
  name: prismaItem.name!,
  basePrice: prismaItem.basePrice,
  expirationPeriod: prismaItem.expirationPeriod || '90',
  createdAt: timestampToISOString(prismaItem.createdAt),
  updatedAt: timestampToISOString(prismaItem.updatedAt)
});

export const adaptItemWithStringTimestamps = (prismaItem: WithTimeStamps<PrismaItem>): WithStringTimeStamps<Item> => ({
  id: prismaItem.id,
  name: prismaItem.name!,
  basePrice: prismaItem.basePrice,
  expirationPeriod: prismaItem.expirationPeriod || '90',
  createdAt: timestampToISOString(prismaItem.createdAt),
  updatedAt: timestampToISOString(prismaItem.updatedAt)
});

export const adaptItemWithDateTimestamps = (prismaItem: WithTimeStamps<PrismaItem>): WithDateTimeStamps<Item> => ({
  id: prismaItem.id,
  name: prismaItem.name!,
  basePrice: prismaItem.basePrice,
  expirationPeriod: prismaItem.expirationPeriod || '90',
  createdAt: new Date(prismaItem.createdAt),
  updatedAt: new Date(prismaItem.updatedAt)
});

export const adaptMachineItem = (prismaMachineItem: PrismaMachineItemWithRelations): MachineItem => ({
  id: prismaMachineItem.id,
  name: prismaMachineItem.name,
  machineId: prismaMachineItem.machineId,
  machine: {
    id: prismaMachineItem.machine.id,
    name: prismaMachineItem.machine.name!,
    createdAt: prismaMachineItem.machine.createdAt.toISOString(),
    updatedAt: prismaMachineItem.machine.updatedAt.toISOString()
  },
  itemId: prismaMachineItem.itemId,
  item: {
    id: prismaMachineItem.item.id,
    name: prismaMachineItem.item.name!,
    basePrice: prismaMachineItem.item.basePrice ?? 3,
    expirationPeriod: prismaMachineItem.item.expirationPeriod || '90',
    createdAt: timestampToISOString(prismaMachineItem.item.createdAt),
    updatedAt: timestampToISOString(prismaMachineItem.item.updatedAt)
  }
});

export const adaptTimeStamps = <T extends DateTimeStamps | StringTimeStamps>(
  model: T
): WithTimeStamps<T> => {
  return {
    ...model,
    createdAt: model.createdAt instanceof Date ? model.createdAt : new Date(model.createdAt),
    updatedAt: model.updatedAt instanceof Date ? model.updatedAt : new Date(model.updatedAt)
  };
};