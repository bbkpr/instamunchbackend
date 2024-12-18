import { prisma } from './prismaClient';

const debug = require('debug')('instamunchbackend:dal');
import {
  CreateItemInput, CreateLocationInput,
  CreateMachineInput, CreateMachineItemInput,
  CreateMachineLocationInput, CreateMachineManufacturerInput, CreateMachineTypeInput,
  UpdateItemInput, UpdateLocationInput,
  UpdateMachineInput, UpdateMachineLocationInput, UpdateMachineManufacturerInput, UpdateMachineTypeInput
} from '../../generated/graphql';

export const getItems = async () => {
  try {
    const items = await prisma.item.findMany({
      include: {
        machineItems: {
          include: {
            machine: {
              include: {
                manufacturer: true,
                machineType: true,
                machineLocations: true
              }
            }
          }
        }
      }
    });
    debug(`getItems retrieved ${items.length} items`);
    return items;
  } catch (e: any) {
    console.error(`Error fetching Items - ${e.name}: ${e.message}`);
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
        machine: {
          include: {
            machineType: true,
            machineLocations: true,
            manufacturer: true
          }
        }
      }
    });
    debug(`getItemsByMachine retrieved ${machineItems.length} items`);
    return machineItems;
  } catch (e: any) {
    console.error(`Error fetching Items by Machine - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const getLocations = async () => {
  try {
    const locations = await prisma.location.findMany({
      include: {
        machineLocations: {
          include: {
            machine: true
          }
        }
      }
    });
    debug(`getLocations retrieved ${locations.length} locations`);
    return locations;
  } catch (e: any) {
    console.error(`Error fetching Locations - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const getLocationsByMachineName = async (machineName: string) => {
  try {
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
  } catch (e: any) {
    console.error(`Error fetching Locations by Machine Name ${machineName} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const getMachines = async () => {
  try {
    return prisma.machine.findMany({
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
    });
  } catch (e: any) {
    console.error(`Error fetching Machines - ${e.name}: ${e.message}`);
    throw e;
  }
};

// Get all Machines stocking an Item
export const getMachinesByItem = async (itemId: string) => {
  try {
    return prisma.machineItem.findMany({
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
  } catch (e: any) {
    console.error(`Error fetching Machines by Item (${itemId}) - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const getMachineItems = async () => {
  try {
    return prisma.machineItem.findMany({
      include: {
        machine: true,
        item: true
      }
    });
  } catch (e: any) {
    console.error(`Error fetching MachineItems - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const getMachineLocations = async () => {
  try {
    return prisma.machineLocation.findMany({
      include: {
        machine: true,
        location: true
      }
    });
  } catch (e: any) {
    console.error(`Error fetching MachineLocations - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const createItem = async (input: CreateItemInput) => {
  try {
    return prisma.item.create({
      data: {
        name: input.name,
        basePrice: input.basePrice!,
        expirationPeriod: input.expirationPeriod!,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  } catch (e: any) {
    console.error(`Error creating Item ${input.name} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const getMachineManufacturers = async () => {
  try {
    return prisma.machineManufacturer.findMany({
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
  } catch (e: any) {
    console.error(`Error fetching MachineManufacturers - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const getMachineManufacturer = async (id: string) => {
  try {
    return prisma.machineManufacturer.findUnique({
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
  } catch (e: any) {
    console.error(`Error fetching MachineManufacturer ${id} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const createMachineManufacturer = async (input: CreateMachineManufacturerInput) => {
  try {
    return prisma.machineManufacturer.create({
      data: {
        name: input.name,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      include: {
        machines: true
      }
    });
  } catch (e: any) {
    console.error(`Error creating MachineManufacturer ${input.name} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const updateMachineManufacturer = async (input: UpdateMachineManufacturerInput) => {
  try {
    return prisma.machineManufacturer.update({
      where: { id: input.id },
      data: {
        name: input.name ?? undefined,
        updatedAt: new Date()
      },
      include: {
        machines: true
      }
    });
  } catch (e: any) {
    console.error(`Error updating MachineManufacturer ${input.id} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const deleteMachineManufacturer = async (id: string) => {
  try {
    // Check if there are any machines using this manufacturer
    const machinesUsingManufacturer = await prisma.machine.count({
      where: { manufacturerId: id }
    });

    if (machinesUsingManufacturer > 0) {
      throw new Error('Cannot delete manufacturer that is in use by machines');
    }

    await prisma.machineManufacturer.delete({
      where: { id }
    });
    return true;
  } catch (e: any) {
    console.error(`Error deleting MachineManufacturer ${id} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const updateItem = async (input: UpdateItemInput) => {
  try {
    return prisma.item.update({
      where: { id: input.id },
      data: {
        name: input.name ?? undefined,
        basePrice: input.basePrice ?? undefined,
        expirationPeriod: input.expirationPeriod ?? undefined,
        updatedAt: new Date()
      }
    });
  } catch (e: any) {
    console.error(`Error updating Item ${input.id} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const createMachine = async (input: CreateMachineInput) => {
  try {
    return prisma.machine.create({
      data: {
        name: input.name!,
        machineTypeId: input.machineTypeId,
        manufacturerId: input.manufacturerId,
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
        manufacturer: true,
        machineType: true
      }
    });
  } catch (e: any) {
    console.error(`Error creating Machine ${input.name} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const updateMachine = async (input: UpdateMachineInput) => {
  try {
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
  } catch (e: any) {
    console.error(`Error updating Machine ${input.id} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const deleteMachine = async (id: string) => {
  try {
    const deleteManyMachineItemsResult = await prisma.machineItem.deleteMany({
      where: { machineId: id }
    });
    debug(`deleteMachine deleted ${deleteManyMachineItemsResult.count} machineItems`);

    await prisma.machine.delete({
      where: { id }
    });
    debug(`deleteMachine deleted Machine id ${id}`);

    return true;
  } catch (e: any) {
    console.error(`Error deleting Machine ${id} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const deleteItem = async (id: string) => {
  try {
    const deleteManyMachineItemsResult = await prisma.machineItem.deleteMany({
      where: { itemId: id }
    });
    debug(`deleteItem deleted ${deleteManyMachineItemsResult.count} machineItems linked to Item ${id}`);

    await prisma.item.delete({
      where: { id }
    });
    debug(`deleteItem deleted Item id ${id}`);

    return true;
  } catch (e: any) {
    console.error(`Error deleting Item ${id} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const createLocation = async (input: CreateLocationInput) => {
  try {
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
  } catch (e: any) {
    console.error(`Error creating Location ${input.address1} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const updateLocation = async (input: UpdateLocationInput) => {
  try {
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
  } catch (e: any) {
    console.error(`Error updating Location ${input.id} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const deleteLocation = async (id: string) => {
  try {
    // First delete any associated MachineLocations
    await prisma.machineLocation.deleteMany({
      where: { locationId: id }
    });

    await prisma.location.delete({
      where: { id }
    });
    return true;
  } catch (e: any) {
    console.error(`Error deleting Location ${id} - ${e.name}: ${e.message}`);
    throw e;
  }
};

// MachineLocation operations
export const createMachineLocation = async (input: CreateMachineLocationInput) => {
  try {
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
    debug(`Created MachineLocation ${result.id}`);
    return result;
  } catch (e: any) {
    console.error(`Error creating MachineLocation for Machine ${input.machineId} @ Location ${input.locationId} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const updateMachineLocation = async (input: UpdateMachineLocationInput) => {
  try {
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
  } catch (e: any) {
    console.error(`Error updating MachineLocation ${input.id} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const deleteMachineLocation = async (id: string) => {
  try {
    await prisma.machineLocation.delete({
      where: { id }
    });
    return true;
  } catch (e: any) {
    console.error(`Error deleting MachineLocation ${id} - ${e.name}: ${e.message}`);
    throw e;
  }
};

// MachineItem operations
// Get all Machines at a Location
export const getMachinesByLocation = async (locationId: string) => {
  try {
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
  } catch (e: any) {
    console.error(`Error getting Machines by Location ${locationId} - ${e.name}: ${e.message}`);
    throw e;
  }
};

// Get all Locations stocking an Item
export const getLocationsByItem = async (itemId: string) => {
  try {
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
  } catch (e: any) {
    console.error(`Error getting Locations by Item ${itemId} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const createMachineItem = async (input: CreateMachineItemInput) => {
  try {
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
  } catch (e: any) {
    console.error(`Error creating MachineItem for Machine ${input.machineId} & Item ${input.itemId} - ${e.name}: ${e.message}`);
    throw e;
  }
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
  try {
    await prisma.machineItem.deleteMany({
      where: {
        id
      }
    });
    return true;
  } catch (e: any) {
    console.error(`Error deleting MachineItem ${id} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const getMachineTypes = async () => {
  try {
    return prisma.machineType.findMany({
      include: {
        machines: {
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
        }
      }
    });
  } catch (e: any) {
    console.error(`Error fetching MachineTypes - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const getMachineType = async (id: string) => {
  try {
    return prisma.machineType.findUnique({
      where: { id },
      include: {
        machines: true
      }
    });
  } catch (e: any) {
    console.error(`Error fetching MachineType ${id} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const createMachineType = async (input: CreateMachineTypeInput) => {
  try {
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
  } catch (e: any) {
    console.error(`Error creating MachineType ${input.name} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const updateMachineType = async (input: UpdateMachineTypeInput) => {
  try {
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
  } catch (e: any) {
    console.error(`Error updating MachineType ${input.id} - ${e.name}: ${e.message}`);
    throw e;
  }
};

export const deleteMachineType = async (id: string) => {
  try {
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
  } catch (e: any) {
    console.error(`Error deleting MachineType ${id} - ${e.name}: ${e.message}`);
    throw e;
  }
};
