import {
  Machine as PrismaMachine,
  MachineItem as PrismaMachineItem,
  Item as PrismaItem,
  Location as PrismaLocation,
  MachineLocation as PrismaMachineLocation,
  MachineType as PrismaMachineType,
  MachineManufacturer as PrismaMachineManufacturer
} from '@prisma/client';
import {
  Machine,
  MachineItem,
  Item,
  Location,
  MachineLocation, Maybe, MachineType
} from '../../generated/graphql';
import {
  DateTimeStamps,
  StringTimeStamps,
  timestampToISOString, WithDateTimeStamps,
  WithStringTimeStamps,
  WithTimeStamps
} from '../util/typeguards';

type PrismaMachineTypeWithRelations = WithTimeStamps<PrismaMachineType> & {
  machines: WithTimeStamps<PrismaMachine>[],
  manufacturer: WithTimeStamps<PrismaMachineManufacturer>
}

type PrismaMachineWithRelations = WithTimeStamps<PrismaMachine> & {
  machineItems?: (PrismaMachineItem & {
    item?: WithTimeStamps<PrismaItem>
  })[];
  machineLocations?: (PrismaMachineLocation & {
    location?: WithTimeStamps<PrismaLocation>
  })[];
  machineType?: WithTimeStamps<PrismaMachineType>,
  manufacturer?: WithTimeStamps<PrismaMachineManufacturer>
};

type PrismaItemWithRelations = WithTimeStamps<PrismaItem> & {
  machineItems?: (PrismaMachineItem & {
    machine?: WithTimeStamps<PrismaMachineWithRelations>
  })[];
};

type PrismaLocationWithRelations = WithTimeStamps<PrismaLocation> & {
  machineLocations?: (PrismaMachineLocation & {
    machine?: WithTimeStamps<PrismaMachineWithRelations>
  })[];
};

type PrismaMachineItemWithRelations = PrismaMachineItem & {
  machine: WithTimeStamps<PrismaMachine>;
  item: WithTimeStamps<PrismaItem>;
};

type PrismaMachineLocationWithRelations = PrismaMachineLocation & {
  machine: WithTimeStamps<PrismaMachine>;
  location: WithTimeStamps<PrismaLocation>;
};

export type ItemWithDates = Omit<Item, 'createdAt' | 'updatedAt'> & { createdAt: Date, updatedAt: Date };

// Adapters
export const adaptLocation = (prismaLocation: PrismaLocationWithRelations): Location => ({
  id: prismaLocation.id,
  address1: prismaLocation.address1,
  address2: prismaLocation.address2 ?? null,
  city: prismaLocation.city,
  stateOrProvince: prismaLocation.stateOrProvince,
  country: prismaLocation.country,
  createdAt: timestampToISOString(prismaLocation.createdAt),
  updatedAt: timestampToISOString(prismaLocation.updatedAt),
  machineLocations: prismaLocation.machineLocations?.map(ml => ({
    id: ml.id,
    name: ml.name,
    machineId: ml.machineId,
    locationId: ml.locationId,
    createdAt: timestampToISOString(ml.createdAt),
    updatedAt: timestampToISOString(ml.updatedAt),
    machine: {
      id: ml.machineId,
      name: ml.machine!.name,
      createdAt: timestampToISOString(ml.machine!.createdAt),
      updatedAt: timestampToISOString(ml.machine!.updatedAt)
    }
  }))
});

export const adaptMachineLocation = (
  prismaMachineLocation: PrismaMachineLocationWithRelations
): MachineLocation => <MachineLocation>({
  id: prismaMachineLocation.id,
  name: prismaMachineLocation.name,
  machineId: prismaMachineLocation.machineId,
  machine: {
    id: prismaMachineLocation.machine.id,
    name: prismaMachineLocation.machine.name,
    createdAt: timestampToISOString(prismaMachineLocation.machine.createdAt),
    updatedAt: timestampToISOString(prismaMachineLocation.machine.updatedAt)
  },
  locationId: prismaMachineLocation.locationId,
  location: {
    id: prismaMachineLocation.location.id,
    address1: prismaMachineLocation.location.address1,
    address2: prismaMachineLocation.location.address2 ?? null,
    city: prismaMachineLocation.location.city,
    stateOrProvince: prismaMachineLocation.location.stateOrProvince,
    country: prismaMachineLocation.location.country,
    createdAt: timestampToISOString(prismaMachineLocation.location.createdAt),
    updatedAt: timestampToISOString(prismaMachineLocation.location.updatedAt)
  },
  createdAt: timestampToISOString(prismaMachineLocation.createdAt),
  updatedAt: timestampToISOString(prismaMachineLocation.updatedAt)
});

export const adaptMachineType = (prismaMachineType: PrismaMachineTypeWithRelations): MachineType => ({
 id: prismaMachineType.id,
 name: prismaMachineType.name,
 manufacturerId: prismaMachineType.manufacturerId,
 manufacturer: {
   id: prismaMachineType.manufacturer.id,
   name: prismaMachineType.manufacturer.name,
   createdAt: timestampToISOString(prismaMachineType.manufacturer.createdAt),
   updatedAt: timestampToISOString(prismaMachineType.manufacturer.updatedAt)
 },
 machines: prismaMachineType.machines?.map(machine => ({
   id: machine.id,
   name: machine.name,
   createdAt: timestampToISOString(machine.createdAt),
   updatedAt: timestampToISOString(machine.updatedAt)
 })),
 createdAt: timestampToISOString(prismaMachineType.createdAt),
 updatedAt: timestampToISOString(prismaMachineType.updatedAt)
});

export const adaptMachine = (prismaMachine: PrismaMachineWithRelations): Machine => ({
  id: prismaMachine.id,
  name: prismaMachine.name!,
  machineType: prismaMachine.machineType ? {
    id: prismaMachine.machineType.id,
    name: prismaMachine.machineType.name,
    manufacturerId: prismaMachine.machineType.manufacturerId,
    manufacturer: {
      id: prismaMachine.manufacturerId,
      name: prismaMachine.manufacturer!.name,
      createdAt: timestampToISOString(prismaMachine.manufacturer!.createdAt),
      updatedAt: timestampToISOString(prismaMachine.manufacturer!.updatedAt)
    },
    createdAt: timestampToISOString(prismaMachine.machineType.createdAt),
    updatedAt: timestampToISOString(prismaMachine.machineType.updatedAt)
  } : null,
  machineItems: prismaMachine.machineItems?.map(machineItem => ({
    id: machineItem.id,
    name: machineItem.name,
    quantity: machineItem.quantity,
    itemId: machineItem.itemId,
    item: {
      id: machineItem.item!.id,
      name: machineItem.item!.name!,
      basePrice: machineItem.item!.basePrice || 3,
      expirationPeriod: machineItem.item!.expirationPeriod || 90,
      createdAt: timestampToISOString(machineItem.item!.createdAt),
      updatedAt: timestampToISOString(machineItem.item!.updatedAt)
    },
    machineId: prismaMachine.id
  })),
  machineLocations: prismaMachine.machineLocations?.map(machineLocation => ({
    id: machineLocation.id,
    createdAt: timestampToISOString(machineLocation.createdAt),
    updatedAt: timestampToISOString(machineLocation.updatedAt),
    locationId: machineLocation.locationId,
    machineId: machineLocation.machineId,
    name: machineLocation.name,
    location: {
      id: machineLocation.locationId,
      address1: machineLocation.location!.address1,
      address2: machineLocation.location!.address2,
      city: machineLocation.location!.city,
      stateOrProvince: machineLocation.location!.stateOrProvince,
      country: machineLocation.location!.country,
      createdAt: timestampToISOString(machineLocation.location!.createdAt),
      updatedAt: timestampToISOString(machineLocation.location!.updatedAt)
    }
  })),
  manufacturer: {
    id: prismaMachine.manufacturerId,
    name: prismaMachine.manufacturer!.name,
    createdAt: timestampToISOString(prismaMachine.manufacturer!.createdAt),
    updatedAt: timestampToISOString(prismaMachine.manufacturer!.updatedAt)
  },
  createdAt: timestampToISOString(prismaMachine.createdAt),
  updatedAt: timestampToISOString(prismaMachine.updatedAt)
});

export const adaptItemWithStringTimestamps = (prismaItem: WithTimeStamps<PrismaItemWithRelations>): WithStringTimeStamps<Item> => ({
  id: prismaItem.id,
  name: prismaItem.name!,
  basePrice: prismaItem.basePrice,
  expirationPeriod: prismaItem.expirationPeriod || 90,
  createdAt: timestampToISOString(prismaItem.createdAt),
  updatedAt: timestampToISOString(prismaItem.updatedAt),
  machineItems: prismaItem.machineItems?.map(machineItem => ({
    id: machineItem.id,
    name: machineItem.name,
    quantity: machineItem.quantity,
    itemId: machineItem.itemId,
    machine: {
      id: machineItem.machineId,
      name: machineItem.name ?? `Item ${prismaItem.name} in Machine ${machineItem.machine!.name}`,
      createdAt: timestampToISOString(machineItem.machine!.createdAt),
      updatedAt: timestampToISOString(machineItem.machine!.updatedAt)
    },
    machineId: machineItem.id
  }))
});

export const adaptMachineItem = (prismaMachineItem: PrismaMachineItemWithRelations): MachineItem => ({
  id: prismaMachineItem.id,
  name: prismaMachineItem.name,
  quantity: prismaMachineItem.quantity,
  machineId: prismaMachineItem.machineId,
  machine: {
    id: prismaMachineItem.machine.id,
    name: prismaMachineItem.machine.name!,
    createdAt: timestampToISOString(prismaMachineItem.machine.createdAt),
    updatedAt: timestampToISOString(prismaMachineItem.machine.updatedAt)
  },
  itemId: prismaMachineItem.itemId,
  item: {
    id: prismaMachineItem.item.id,
    name: prismaMachineItem.item.name!,
    basePrice: prismaMachineItem.item.basePrice ?? 3,
    expirationPeriod: prismaMachineItem.item.expirationPeriod || 90,
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