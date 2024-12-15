import { prisma } from '../prisma/prismaClient';

const debug = require('debug')('instamunchbackend:dal');
import {
  CreateItemInput, CreateLocationInput,
  CreateMachineInput, CreateMachineItemInput,
  CreateMachineLocationInput, CreateMachineTypeInput,
  UpdateItemInput, UpdateLocationInput,
  UpdateMachineInput, UpdateMachineLocationInput, UpdateMachineTypeInput
} from '../generated/graphql';

export const getItems = async () => {
  try {
    const items = await prisma.item.findMany({
      include: {
        machineItems: {
          include: {
            machine: true
          }
        }
      }
    });
    await prisma.$disconnect();
    debug(`getItems retrieved ${items.length} items`);
    return items;
  } catch (e: any) {
    console.error(`Error fetching Machines - ${e.name}: ${e.message}`);
    await prisma.$disconnect();
    throw e;
  }
};

// Get all Items in a specific Machine
export const getItemsByMachine = async (machineId: string) => {
  try {
    const machineItems = await prisma.machineItem.findMany({
      where: { machineId },
      include: {
        item: true,
        machine: true
      }
    });
    await prisma.$disconnect();
    debug(`getItemsByMachine retrieved ${machineItems.length} items`);
    return machineItems;
  } catch (e: any) {
    console.error(`Error fetching Locations - ${e.name}: ${e.message}`);
    await prisma.$disconnect();
    throw e;
  }
};

export const getLocations = async () => {
  try {
    const locations = await prisma.location.findMany({
      include: {
        machineLocations: {
          include: {
            machine: {
              include: {
                machineItems: {
                  include: {
                    item: true
                  }
                }
              }
            }
          }
        }
      }
    });
    await prisma.$disconnect();
    return locations;
  } catch (e: any) {
    console.error(`Error fetching Locations - ${e.name}: ${e.message}`);
    await prisma.$disconnect();
    throw e;
  }
};

export const getLocationsByMachineName = async (machineName: string) => {
  return prisma.location.findMany({
    where: {
      machineLocations: {
        some: {
          machine: {
            name: {
              contains: machineName,
              mode: 'insensitive'
            }
          }
        }
      }
    },
    include: {
      machineLocations: {
        include: {
          machine: true
        }
      }
    }
  });
};

export const getMachines = async () => {
  try {
    const machines = await prisma.machine.findMany({
      include: {
        machineType: true,
        machineItems: {
          include: {
            item: true
          }
        },
        machineLocations: {
          include: {
            location: true
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

// Get all Machines stocking an Item
export const getMachinesByItem = async (itemId: string) => {
  return prisma.machineItem.findMany({
    where: { itemId },
    include: {
      machine: {
        include: {
          machineLocations: {
            include: {
              location: true
            }
          }
        }
      },
      item: true
    }
  });
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

export const getMachineLocations = async () => {
  try {
    const machineLocations = await prisma.machineLocation.findMany({
      include: {
        machine: true,
        location: true
      }
    });
    await prisma.$disconnect();
    return machineLocations;
  } catch (e: any) {
    console.error(`Error fetching MachineItems - ${e.name}: ${e.message}`);
    await prisma.$disconnect();
    throw e;
  }
};

export const createItem = async (input: CreateItemInput) => {
  return prisma.item.create({
    data: {
      name: input.name,
      basePrice: input.basePrice!,
      expirationPeriod: input.expirationPeriod!,
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

export const createMachine = async (input: CreateMachineInput) => {
  return prisma.machine.create({
    data: {
      name: input.name!,
      machineTypeId: input.machineTypeId,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    include: {
      machineItems: {
        include: {
          item: true
        }
      },
      machineLocations: {
        include: {
          location: true
        }
      },
      machineType: true
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
      machineItems: {
        include: {
          item: true
        }
      },
      machineLocations: {
        include: {
          location: true
        }
      },
      machineType: true
    }
  });
};

export const deleteMachine = async (id: string) => {
  const deleteManyMachineItemsResult = await prisma.machineItem.deleteMany({
    where: { machineId: id }
  });
  debug(`deleteMachine deleted ${deleteManyMachineItemsResult.count} machineItems`);

  await prisma.machine.delete({
    where: { id }
  });
  debug(`deleteMachine deleted Machine id ${id}`);

  return true;
};

/**
 *
 * @param id
 */
export const deleteItem = async (id: string) => {
  const deleteManyMachineItemsResult = await prisma.machineItem.deleteMany({
    where: { itemId: id }
  });
  debug(`deleteItem deleted ${deleteManyMachineItemsResult.count} machineItems`);

  await prisma.item.delete({
    where: { id }
  });
  debug(`deleteItem deleted Item id ${id}`);

  return true;
};

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
export const createMachineLocation = async (input: CreateMachineLocationInput) => {
  const result = await prisma.machineLocation.create({
    data: {
      name: input.name,
      machineId: input.machineId,
      locationId: input.locationId,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    include: {
      machine: true,
      location: true
    }
  });

  return result;
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

export const deleteMachineLocation = async (id: string) => {
  await prisma.machineLocation.delete({
    where: { id }
  });
  return true;
};

// MachineItem operations
// Get all Machines at a Location
export const getMachinesByLocation = async (locationId: string) => {
  return prisma.machine.findMany({
    where: {
      machineLocations: {
        some: {
          locationId
        }
      }
    },
    include: {
      machineItems: {
        include: {
          item: true
        }
      },
      machineLocations: {
        include: {
          location: true
        }
      }
    }
  });
};

// Get all Locations stocking an Item
export const getLocationsByItem = async (itemId: string) => {
  return prisma.location.findMany({
    where: {
      machineLocations: {
        some: {
          machine: {
            machineItems: {
              some: {
                itemId
              }
            }
          }
        }
      }
    },
    include: {
      machineLocations: {
        include: {
          machine: {
            include: {
              machineItems: {
                include: {
                  item: true
                }
              }
            }
          }
        }
      }
    }
  });
};

export const createMachineItem = async (input: CreateMachineItemInput) => {
  return prisma.machineItem.create({
    data: {
      machineId: input.machineId,
      itemId: input.itemId,
      name: input.name ?? null,
      quantity: input.quantity
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

export const deleteMachineItem = async (id: string) => {
  await prisma.machineItem.deleteMany({
    where: {
      id
    }
  });
  return true;
};

export const getMachineTypes = async () => {
  try {
    const machineTypes = await prisma.machineType.findMany({
      include: {
        machines: true
      }
    });
    await prisma.$disconnect();
    return machineTypes;
  } catch (e: any) {
    console.error(`Error fetching MachineTypes - ${e.name}: ${e.message}`);
    await prisma.$disconnect();
    throw e;
  }
};

export const getMachineType = async (id: string) => {
  try {
    const machineType = await prisma.machineType.findUnique({
      where: { id },
      include: {
        machines: true
      }
    });
    await prisma.$disconnect();
    return machineType;
  } catch (e: any) {
    console.error(`Error fetching MachineType - ${e.name}: ${e.message}`);
    await prisma.$disconnect();
    throw e;
  }
};

export const createMachineType = async (input: CreateMachineTypeInput) => {
  return prisma.machineType.create({
    data: {
      name: input.name,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    include: {
      machines: true
    }
  });
};

export const updateMachineType = async (input: UpdateMachineTypeInput) => {
  return prisma.machineType.update({
    where: { id: input.id },
    data: {
      name: input.name ?? undefined,
      updatedAt: new Date()
    },
    include: {
      machines: true
    }
  });
};

export const deleteMachineType = async (id: string) => {
  // Check if there are any machines using this type
  const machinesUsingType = await prisma.machine.count({
    where: { machineTypeId: id }
  });

  if (machinesUsingType > 0) {
    throw new Error('Cannot delete machine type that is in use by machines');
  }

  await prisma.machineType.delete({
    where: { id }
  });

  return true;
};
