const debug = require('debug')('instamunchbackend:dal');
import {
  CreateItemInput,
  CreateMachineInput,
  CreateMachineLocationInput, MachineItemInput,
  UpdateItemInput,
  UpdateMachineInput, UpdateMachineLocationInput
} from '../generated/graphql';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Machine operations
export const getMachines = async () => {
  try {
    const machines = await prisma.machine.findMany({
      include: {
        items: {
          include: {
            item: true
          }
        }
      }
    });
    await prisma.$disconnect();
    return machines;
  } catch (e: any) {
    console.error(`Error fetching Machines - ${e.name}: ${e.message}`);
    await prisma.$disconnect();
    throw e;
  }
};

export const getMachineItems = async () => {
  try {
    const machineItems = await prisma.machineItem.findMany({
      include: {
        machine: true,
        item: true
      }
    });
    await prisma.$disconnect();
    return machineItems;
  } catch (e: any) {
    console.error(`Error fetching MachineItems - ${e.name}: ${e.message}`);
    await prisma.$disconnect();
    throw e;
  }
};
export const createMachine = async (input: CreateMachineInput) => {
  return prisma.machine.create({
    data: {
      name: input.name ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    include: {
      items: {
        include: {
          item: true
        }
      }
    }
  });
};

export const updateMachine = async (input: UpdateMachineInput) => {
  return prisma.machine.update({
    where: { id: input.id },
    data: {
      name: input.name ?? undefined,
      updatedAt: new Date()
    },
    include: {
      items: {
        include: {
          item: true
        }
      }
    }
  });
};

export const deleteMachine = async (id: string) => {
  await prisma.machineItem.deleteMany({
    where: { machineId: id }
  });

  await prisma.machine.delete({
    where: { id }
  });

  return true;
};

// Item operations
export const createItem = async (input: CreateItemInput) => {
  return prisma.item.create({
    data: {
      name: input.name,
      basePrice: input.basePrice ?? null,
      expirationPeriod: input.expirationPeriod ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
};

export const updateItem = async (input: UpdateItemInput) => {
  return prisma.item.update({
    where: { id: input.id },
    data: {
      name: input.name ?? undefined,
      basePrice: input.basePrice ?? undefined,
      expirationPeriod: input.expirationPeriod ?? undefined,
      updatedAt: new Date()
    }
  });
};

export const deleteItem = async (id: string) => {
  await prisma.machineItem.deleteMany({
    where: { itemId: id }
  });

  await prisma.item.delete({
    where: { id }
  });

  return true;
};

// Location operations
export const createLocation = async (input: CreateLocationInput) => {
  return prisma.location.create({
    data: {
      address1: input.address1,
      address2: input.address2 ?? null,
      city: input.city,
      stateOrProvince: input.stateOrProvince,
      country: input.country,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
};

export const updateLocation = async (input: UpdateLocationInput) => {
  return prisma.location.update({
    where: { id: input.id },
    data: {
      address1: input.address1 ?? undefined,
      address2: input.address2 ?? undefined,
      city: input.city ?? undefined,
      stateOrProvince: input.stateOrProvince ?? undefined,
      country: input.country ?? undefined,
      updatedAt: new Date()
    }
  });
};

export const deleteLocation = async (id: string) => {
  // First delete any associated MachineLocations
  await prisma.machineLocation.deleteMany({
    where: { locationId: id }
  });

  await prisma.location.delete({
    where: { id }
  });
  return true;
};

// MachineLocation operations
export const assignMachineLocation = async (input: CreateMachineLocationInput) => {
  return prisma.machineLocation.create({
    data: {
      name: input.name,
      machine: { connect: { id: input.machineId } },
      location: { connect: { id: input.locationId } },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    include: {
      machine: true,
      location: true
    }
  });
};

export const updateMachineLocation = async (input: UpdateMachineLocationInput) => {
  const updateData: any = {
    updatedAt: new Date()
  };

  if (input.name) updateData.name = input.name;
  if (input.machineId) updateData.machine = { connect: { id: input.machineId } };
  if (input.locationId) updateData.location = { connect: { id: input.locationId } };

  return prisma.machineLocation.update({
    where: { id: input.id },
    data: updateData,
    include: {
      machine: true,
      location: true
    }
  });
};

export const removeMachineLocation = async (id: string) => {
  await prisma.machineLocation.delete({
    where: { id }
  });
  return true;
};

// MachineItem operations
export const addMachineItem = async (input: MachineItemInput) => {
  return prisma.machineItem.create({
    data: {
      machineId: input.machineId,
      itemId: input.itemId,
      name: input.name ?? null
    },
    include: {
      machine: true,
      item: true
    }
  });
};

export const updateMachineItems = async (machineId: string, itemIds: string[]) => {
  try {
    // Execute operations in a transaction to ensure data consistency
    return await prisma.$transaction(async (tx) => {
      // Verify machine exists
      const machine = await tx.machine.findUnique({
        where: { id: machineId }
      });

      if (!machine) {
        throw new Error(`Machine with ID ${machineId} not found`);
      }

      // Verify all items exist
      const items = await tx.item.findMany({
        where: { id: { in: itemIds } }
      });

      if (items.length !== itemIds.length) {
        const foundIds = items.map(item => item.id);
        const missingIds = itemIds.filter(id => !foundIds.includes(id));
        throw new Error(`Items not found: ${missingIds.join(', ')}`);
      }

      // Remove existing machine-item relationships
      await tx.machineItem.deleteMany({
        where: { machineId }
      });

      // Create new machine-item relationships
      const machineItems = await Promise.all(
        itemIds.map(itemId =>
          tx.machineItem.create({
            data: {
              machineId,
              itemId
            },
            include: {
              machine: true,
              item: true
            }
          })
        )
      );

      return machineItems;
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update machine items: ${error.message}`);
    }
    throw new Error('Failed to update machine items: Unknown error');
  }
};

export const removeMachineItem = async (machineId: string, itemId: string) => {
  await prisma.machineItem.deleteMany({
    where: {
      machineId,
      itemId
    }
  });
  return true;
};

