import {
  adaptItemWithStringTimestamps,
  adaptLocation,
  adaptMachine,
  adaptMachineItem,
  adaptMachineLocation, ItemWithDates
} from '../adapters/model.adapters';

const debug = require('debug')('instamunchbackend:resolvers');
import { CreateItemInput, Machine, MachineItem, Resolvers, UpdateItemInput } from '../../generated/graphql';
import { InstaMunchContext } from './context';
import {
  createMachineItem,
  createMachineLocation,
  createItem,
  createLocation,
  createMachine,
  deleteItem,
  deleteLocation,
  deleteMachine,
  getMachineItems,
  getMachines,
  deleteMachineItem,
  deleteMachineLocation,
  updateItem,
  updateLocation,
  updateMachine,
  updateMachineItems,
  updateMachineLocation,
  getItems,
  getLocations,
  getItemsByMachine,
  getMachinesByItem,
  getLocationsByItem,
  getLocationsByMachineName,
  getMachinesByLocation,
  getMachineType,
  getMachineTypes,
  deleteMachineType, updateMachineType, createMachineType
} from '../dal/machine.dal';

export const resolvers: Resolvers<InstaMunchContext> = {
  Query: {
    async getItems(_, {}, context) {
      try {
        const items = await getItems();
        debug(`${items.length} Items found`);
        return items.map(item => ({
          id: item.id,
          name: item.name,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString(),
          basePrice: item.basePrice,
          expirationPeriod: item.expirationPeriod
        }));
      } catch (error) {
        debug('Error in machines query:', error);
        throw error;
      }
    },
    async getMachines(_, {}, context) {
      try {
        const machines = await getMachines();
        debug(`${machines.length} Machines found`);
        return machines.map(adaptMachine);
      } catch (error) {
        debug('Error in machines query:', error);
        throw error;
      }
    },
    async getMachineItems(): Promise<MachineItem[]> {
      try {
        const items = await getMachineItems();
        debug(`${items.length} MachineItems found`);
        return items.map(adaptMachineItem);
      } catch (error) {
        debug('Error in machineItems query:', error);
        throw error;
      }
    },
    async getLocations(_, {}, context) {
      try {
        const locations = await getLocations();
        debug(`${locations.length} Locations found`);
        return locations.map(adaptLocation);
      } catch (error) {
        debug('Error in locations query:', error);
        throw error;
      }
    },

    async getItemsByMachine(_, { machineId }, context) {
      try {
        const items = await getItemsByMachine(machineId);
        debug(`${items.length} Items found for machine ${machineId}`);
        return items.map(adaptMachineItem);
      } catch (error) {
        debug('Error in getItemsByMachine query:', error);
        throw error;
      }
    },

    async getMachinesByItem(_, { itemId }, context) {
      try {
        const machines = await getMachinesByItem(itemId);
        debug(`${machines.length} Machines found for item ${itemId}`);
        return machines.map(adaptMachineItem);
      } catch (error) {
        debug('Error in getMachinesByItem query:', error);
        throw error;
      }
    },

    async getLocationsByItem(_, { itemId }, context) {
      try {
        const locations = await getLocationsByItem(itemId);
        debug(`${locations.length} Locations found for item ${itemId}`);
        return locations.map(adaptLocation);
      } catch (error) {
        debug('Error in getLocationsByItem query:', error);
        throw error;
      }
    },

    async getLocationsByMachineName(_, { machineName }, context) {
      try {
        const locations = await getLocationsByMachineName(machineName);
        debug(`${locations.length} Locations found for machine name ${machineName}`);
        return locations.map(adaptLocation);
      } catch (error) {
        debug('Error in getLocationsByMachineName query:', error);
        throw error;
      }
    },

    async getMachinesByLocation(_, { locationId }, context) {
      try {
        const machines = await getMachinesByLocation(locationId);
        debug(`${machines.length} Machines found for location ${locationId}`);
        return machines.map(adaptMachine);
      } catch (error) {
        debug('Error in getMachinesByLocation query:', error);
        throw error;
      }
    },
    async getMachineTypes(_, {}, context) {
      try {
        const types = await getMachineTypes();
        debug(`${types.length} MachineTypes found`);
        return types.map(type => ({
          id: type.id,
          name: type.name,
          createdAt: type.createdAt.toISOString(),
          updatedAt: type.updatedAt.toISOString(),
          machines: type.machines?.map(adaptMachine) || []
        }));
      } catch (error) {
        debug('Error in machineTypes query:', error);
        throw error;
      }
    },

    async getMachineType(_, { id }, context) {
      try {
        const type = await getMachineType(id);
        if (!type) return null;
        return {
          id: type.id,
          name: type.name,
          createdAt: type.createdAt.toISOString(),
          updatedAt: type.updatedAt.toISOString(),
          machines: type.machines?.map(adaptMachine) || []
        };
      } catch (error) {
        debug('Error in machineType query:', error);
        throw error;
      }
    }
  },
  Mutation: {
    // Machine operations
    async createMachine(_, { input }, context) {
      const machine = await createMachine(input);
      debug(`Machine created with ID ${machine.id}`);
      return {
        code: '200',
        success: true,
        message: `Machine created: ${machine.id}`,
        machine: adaptMachine(machine)
      };
    },

    async updateMachine(_, { input }, context) {
      const machine = await updateMachine(input);
      debug(`Machine updated with ID ${machine!.id}, Name: ${input.name}`);
      return {
        code: '200',
        success: true,
        message: `Machine updated: ${machine!.id}`,
        machine: adaptMachine(machine!)
      };
    },

    async deleteMachine(_, { id }, context) {
      await deleteMachine(id);
      debug(`Machine deleted with ID ${id}`);
      return { code: '200', success: true, message: `Machine deleted: ${id}` };
    },

    // Item operations
    async createItem(_: any, { input }: { input: CreateItemInput }, context: InstaMunchContext) {
      const item = await createItem(input);
      debug(`Item created with ID ${item.id}, Name: ${item.name}`);
      return {
        code: '200',
        success: true,
        message: `Item created: ${item.id}`,
        item: adaptItemWithStringTimestamps(item)
      };
    },

    async updateItem(_: any, { input }: { input: UpdateItemInput }, context: InstaMunchContext) {
      const item = await updateItem(input);
      debug(`Item updated with ID ${item.id}, Name: ${item.name}`);
      return {
        code: '200',
        success: true,
        message: `Item updated: ${item.id}`,
        item: adaptItemWithStringTimestamps(item)
      };
    },

    async deleteItem(_, { id }: { id: string }, context: InstaMunchContext) {
      await deleteItem(id);
      debug(`Item deleted with ID ${id}`);
      return { code: '200', success: true, message: `Item deleted: ${id}` };
    },

    // Location operations
    async createLocation(_, { input }, context: InstaMunchContext) {
      const location = await createLocation(input);
      debug(`Location created with ID ${location.id}, Address1: ${location.address1}`);
      return {
        code: '200',
        success: true,
        message: `Location created: ${location.id}`,
        location: adaptLocation(location)
      };
    },

    async updateLocation(_, { input }, context: InstaMunchContext) {
      const location = await updateLocation(input);
      debug(`Location updated with ID ${location.id}, Address1: ${location.address1}`);
      return {
        code: '200',
        success: true,
        message: `Location updated: ${location.id}`,
        location: adaptLocation(location)
      };
    },

    async deleteLocation(_, { id }, context: InstaMunchContext) {
      await deleteLocation(id);
      debug(`Location deleted with ID ${id}`);
      return { code: '200', success: true, message: `Location deleted: ${id}` };
    },

    // MachineLocation operations
    async createMachineLocation(_, { input }, context: InstaMunchContext) {
      const machineLocation = await createMachineLocation(input);
      debug(`MachineLocation created with ID ${machineLocation.id}, machineId ${input.machineId}, locationId: ${input.locationId}`);
      return {
        code: '200',
        success: true,
        message: `MachineLocation created: ${machineLocation.id}`,
        machineLocation: adaptMachineLocation(machineLocation)
      };
    },

    async updateMachineLocation(_, { input }, context: InstaMunchContext) {
      const machineLocation = await updateMachineLocation(input);
      debug(`MachineLocation updated with ID ${machineLocation.id}, machineId ${input.machineId}, locationId: ${input.locationId}`);
      return {
        code: '200',
        success: true,
        message: `MachineLocation updated: ${machineLocation.id}`,
        machineLocation: adaptMachineLocation(machineLocation)
      };
    },

    async deleteMachineLocation(_, { id }, context: InstaMunchContext) {
      await deleteMachineLocation(id);
      debug(`MachineLocation deleted with ID ${id}`);
      return { code: '200', success: true, message: `MachineLocation deleted: ${id}` };
    },

    // MachineItem operations
    async createMachineItem(_, { input }, context: InstaMunchContext) {
      const machineItem = await createMachineItem(input);
      debug(`MachineItem created with ID ${machineItem.id}, Name: ${machineItem.name}`);
      return {
        code: '200',
        success: true,
        message: `MachineItem created: ${machineItem.id}`,
        machineItem: adaptMachineItem(machineItem)
      };
    },

    async deleteMachineItem(_, { id }, context: InstaMunchContext) {
      await deleteMachineItem(id);
      debug(`MachineItem deleted with ID ${id}`);
      return { code: '200', success: true, message: `MachineItem deleted: ${id} ` };
    },

    async createMachineType(_, { input }, context) {
      try {
        const machineType = await createMachineType(input);
        return {
          code: '200',
          success: true,
          message: 'Machine type created successfully',
          machineType: {
            id: machineType.id,
            name: machineType.name,
            createdAt: machineType.createdAt.toISOString(),
            updatedAt: machineType.updatedAt.toISOString(),
            machines: machineType.machines?.map(adaptMachine) || []
          }
        };
      } catch (error) {
        return {
          code: '500',
          success: false,
          message: (error as any).message
        };
      }
    },

    async updateMachineType(_, { input }, context) {
      try {
        const machineType = await updateMachineType(input);
        return {
          code: '200',
          success: true,
          message: 'Machine type updated successfully',
          machineType: {
            id: machineType.id,
            name: machineType.name,
            createdAt: machineType.createdAt.toISOString(),
            updatedAt: machineType.updatedAt.toISOString(),
            machines: machineType.machines?.map(adaptMachine) || []
          }
        };
      } catch (error) {
        return {
          code: '500',
          success: false,
          message: (error as any).message
        };
      }
    },

    async deleteMachineType(_, { id }, context) {
      try {
        await deleteMachineType(id);
        return {
          code: '200',
          success: true,
          message: 'Machine type deleted successfully'
        };
      } catch (error) {
        return {
          code: '500',
          success: false,
          message: (error as any).message
        };
      }
    },

    async updateMachineItems(_, { input }, context: InstaMunchContext) {
      try {
        const items = await updateMachineItems(input.machineId, input.itemIds);
        debug(`MachineItems updated with machineId ${input.machineId}, itemIds: ${input.itemIds.join(', ')}`);
        return {
          code: '200',
          success: true,
          message: 'Machine items updated successfully',
          machineItems: items.map(adaptMachineItem)
        };
      } catch (error) {
        return {
          code: '500',
          success: false,
          message: error instanceof Error ? error.message : 'An unexpected error occurred',
          machineItems: []
        };
      }
    }
  }
};
