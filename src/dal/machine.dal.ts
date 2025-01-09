import { prisma } from './prismaClient';
import isNumber from 'lodash/isNumber';

const debug = require('debug')('instamunchbackend:dal');
import {
  CreateItemInput, CreateLocationInput,
  CreateMachineInput, CreateMachineItemInput,
  CreateMachineLocationInput, CreateMachineManufacturerInput, CreateMachineTypeInput,
  UpdateItemInput, UpdateLocationInput,
  UpdateMachineInput, UpdateMachineLocationInput, UpdateMachineManufacturerInput, UpdateMachineTypeInput
} from '../../generated/graphql';

export const getItems = async () => {
  const items = await prisma.item.findMany({
    include: {
      machineItems: {
        include: {
          machine: true
        }
      }
    }
  });
  debug(`getItems found ${items.length} items`);
  return items;
};

// Get all Items in a specific Machine
export const getItemsByMachine = async (machineId: string) => {
  const machineItems = await prisma.machineItem.findMany({
    where: { machineId },
    include: {
      item: true,
      machine: {
        include: {
          machineType: true,
          machineLocations: true,
          manufacturer: true
        }
      }
    }
  });
  debug(`getItemsByMachine found ${machineItems.length} items`);
  return machineItems;
};

export const getLocations = async () => {
  const locations = await prisma.location.findMany({
    include: {
      machineLocations: {
        include: {
          machine: true
        }
      }
    }
  });
  debug(`getLocations found ${locations.length} locations`);
  return locations;
};

export const getLocationsByMachineName = async (machineName: string) => {
  const locations = await prisma.location.findMany({
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

  debug(`getLocationsByMachineName (${machineName}) found ${locations.length} locations`);
  return locations;
};

export const getMachine = async (id: string) => {
  return prisma.machine.findUnique({
    where: { id },
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
      machineType: true,
      manufacturer: true
    }
  });
};

export const getMachines = async () => {
  const machines = await prisma.machine.findMany({
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
      machineType: true,
      manufacturer: true
    }
  });
  debug(`getMachines found ${machines.length} Machines`);
  return machines;
};

// Get all Machines stocking an Item
export const getMachinesByItem = async (itemId: string) => {
  const machinesByItem = await prisma.machineItem.findMany({
    where: { itemId },
    include: {
      machine: {
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
          },
          manufacturer: true
        }
      },
      item: true
    }
  });

  debug(`getMachinesByItem (${itemId}) found ${machinesByItem.length} Machines`);
  return machinesByItem;
};

export const getMachineItems = async () => {
  const machineItems = await prisma.machineItem.findMany({
    include: {
      machine: true,
      item: true
    }
  });

  debug(`getMachineItems found ${machineItems.length} MachineItems`);
  return machineItems;
};

export const getMachineLocations = async () => {
  const machineLocations = await prisma.machineLocation.findMany({
    include: {
      machine: true,
      location: true
    }
  });

  debug(`getMachineLocations found ${machineLocations.length} MachineLocations`);
  return machineLocations;
};

export const createItem = async (input: CreateItemInput) => {
  if (!isNumber(input.basePrice) || !isNumber(input.expirationPeriod)) {
    throw Error('Base Price and Expiration Period must be numbers');
  }
  const createdItem = await prisma.item.create({
    data: {
      name: input.name,
      basePrice: input.basePrice!,
      expirationPeriod: input.expirationPeriod!,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });

  debug(`createItem created item ${input.name} (${createdItem.id})`);
  return createdItem;
};

export const getMachineManufacturers = async () => {
  const machineManufacturers = await prisma.machineManufacturer.findMany({
    include: {
      machines: {
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
          },
          manufacturer: true
        }
      }
    }
  });

  debug(`getMachineManufacturers found ${machineManufacturers.length} MachineManufacturers`);
  return machineManufacturers;
};

export const getMachineManufacturer = async (id: string) => {
  const machineManufacturer = await prisma.machineManufacturer.findUnique({
    where: { id },
    include: {
      machines: {
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
      }
    }
  });

  if (machineManufacturer != null) {
    debug(`getMachineManufacturer (${id}) found MachineManufacturer ${machineManufacturer.name}`);
  } else {
    /* istanbul ignore */
    debug(`getMachineManufacturer (${id}) did not find a MachineManufacturer`);
  }
  return machineManufacturer;
};

export const createMachineManufacturer = async (input: CreateMachineManufacturerInput) => {
  const createdMachineManufacturer = await prisma.machineManufacturer.create({
    data: {
      name: input.name,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    include: {
      machines: true
    }
  });
  debug(`createMachineManufacturer created MachineManufacturer ${createdMachineManufacturer.name} (${createdMachineManufacturer.id})`);
  return createdMachineManufacturer;
};

export const updateMachineManufacturer = async (input: UpdateMachineManufacturerInput) => {
  return prisma.machineManufacturer.update({
    where: { id: input.id },
    data: {
      name: input.name!,
      updatedAt: new Date()
    },
    include: {
      machines: true
    }
  });
};

export const deleteMachineManufacturer = async (id: string) => {
  const machinesUsingManufacturer = await prisma.machine.count({
    where: { manufacturerId: id }
  });

  if (machinesUsingManufacturer > 0) {
    throw new Error('Cannot delete Manufacturer that is in use by Machines');
  }

  await prisma.machineManufacturer.delete({
    where: { id }
  });
  return true;
};

export const updateItem = async (input: UpdateItemInput) => {
  const updatedItem = await prisma.item.update({
    where: { id: input.id },
    data: {
      name: input.name ?? undefined,
      basePrice: input.basePrice ?? undefined,
      expirationPeriod: input.expirationPeriod ?? undefined,
      updatedAt: new Date()
    },
    include: {
      machineItems: {
        include: {
          machine: true
        }
      }
    }
  });
  debug(`updateItem updated Item ${input.id} (${updatedItem.name})`);
  return updatedItem;
};

export const createMachine = async (input: CreateMachineInput) => {
  const createdMachine = await prisma.machine.create({
    data: {
      name: input.name!,
      machineTypeId: input.machineTypeId,
      manufacturerId: input.manufacturerId,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    include: {
      machineType: true,
      manufacturer: true
    }
  });
  debug(`createMachine created Machine ${createdMachine.id} (${createdMachine.manufacturer.name} ${createdMachine.name})`);
  return createdMachine;
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
      manufacturer: true,
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

export const deleteItem = async (id: string) => {
  const deleteManyMachineItemsResult = await prisma.machineItem.deleteMany({
    where: { itemId: id }
  });
  debug(`deleteItem deleted ${deleteManyMachineItemsResult.count} machineItems linked to Item ${id}`);

  await prisma.item.delete({
    where: { id }
  });

  debug(`deleteItem deleted Item ${id}`);
  return true;
};

export const createLocation = async (input: CreateLocationInput) => {
  const createdLocation = await prisma.location.create({
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
  debug(`createLocation created Location ${createdLocation.id} (${createdLocation.address1})`);
  return createdLocation;
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
  const deleteManyMlRes = await prisma.machineLocation.deleteMany({
    where: { locationId: id }
  });
  if (deleteManyMlRes) {
    /* istanbul ignore */
    debug(`Deleted ${deleteManyMlRes.count} machineLocations`);
  }
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
  debug(`createMachineLocation created MachineLocation ${result.id}`);
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
      },
      manufacturer: true,
      machineType: true
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
  // Execute operations in a transaction to ensure data consistency
  return prisma.$transaction(async (tx) => {
    // Verify machine exists
    const machine = await tx.machine.findUnique({
      where: { id: machineId }
    });

    if (!machine) {
      throw new Error(`updateMachineItems: Machine ${machineId} not found`);
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
    debug(`updateMachineItems updated ${machineItems.length} MachineItems`);
    return machineItems;
  });
};

export const deleteMachineItem = async (id: string) => {
  const result = await prisma.machineItem.deleteMany({
    where: {
      id
    }
  });
  debug(`deleteMachineItem deleted ${result.count} MachineItems`);
  return true;
};

export const getMachineTypes = async () => {
  const result = await prisma.machineType.findMany({
    include: {
      machines: true,
      manufacturer: true
    }
  });
  if (result != null) {
    debug(`getMachineTypes found ${result.length} MachineTypes`);
  } else {
    /* istanbul ignore */
    debug(`getMachineTypes did not find any MachineTypes`);
  }
  return result;
};

export const getMachineType = async (id: string) => {
  return prisma.machineType.findUnique({
    where: { id },
    include: {
      machines: true,
      manufacturer: true
    }
  });
};

export const createMachineType = async (input: CreateMachineTypeInput) => {
  const machineType = await prisma.machineType.create({
    data: {
      name: input.name,
      manufacturerId: input.manufacturerId,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    include: {
      machines: true,
      manufacturer: true
    }
  });
  debug(`createMachineType created MachineType ${machineType.id}`);
  return machineType;
};

export const updateMachineType = async (input: UpdateMachineTypeInput) => {
  const result = await prisma.machineType.update({
    where: { id: input.id },
    data: {
      name: input.name ?? undefined,
      manufacturerId: input.manufacturerId ?? undefined,
      updatedAt: new Date()
    },
    include: {
      machines: true,
      manufacturer: true
    }
  });
  debug(`updateMachineType updated MachineType ${input.id}`);
  return result;
};

export const deleteMachineType = async (id: string) => {
  // Check if there are any machines using this type
  const machinesUsingType = await prisma.machine.count({
    where: { machineTypeId: id }
  });

  if (machinesUsingType > 0) {
    throw new Error('Cannot delete machine type that is in use by machines');
  }

  const result = await prisma.machineType.delete({
    where: { id }
  });
  debug(`deleteMachineType deleted MachineType ${id}`);
  return true;
};
