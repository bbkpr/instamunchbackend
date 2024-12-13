import {
  adaptItemWithDateTimestamps, adaptItemWithStringTimestamps, adaptItemWithTimestamps,
  adaptLocation,
  adaptMachine,
  adaptMachineItem,
  adaptMachineLocation, ItemWithDates
} from '../adapters/model.adapters';

const debug = require('debug')('instamunchbackend:resolvers');
import { CreateItemInput, Machine, MachineItem, Resolvers, UpdateItemInput } from '../generated/graphql';
import { InstaMunchContext } from './context';
import {
  createMachineItem,
  createMachineLocation,
  createItem,
  createLocation,
  createMachine,
  deleteItem, deleteLocation,
  deleteMachine,
  getMachineItems,
  getMachines, deleteMachineItem,
  deleteMachineLocation,
  updateItem, updateLocation,
  updateMachine, updateMachineItems, updateMachineLocation, getItems
} from '../dal/machine.dal';
import { Item } from '@prisma/client';
import { timestampToISOString, WithStringTimeStamps, WithTimeStamps } from '../util/typeguards';

export const resolvers: Resolvers<InstaMunchContext> = {
  Query: {
    async getItems(_, { }, context) {
      try {
        const items = await getItems();
        return items.map(item => ({
          id: item.id,
          name: item.name,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString(),
          basePrice: item.basePrice,
          expirationPeriod: item.expirationPeriod
        }))
      } catch (error) {
        debug('Error in machines query:', error);
        throw error;
      }
    },
    async getMachines(_, { }, context) {
      try {
        const machines = await getMachines();
        return machines.map(adaptMachine);
      } catch (error) {
        debug('Error in machines query:', error);
        throw error;
      }
    },
    async getMachineItems(): Promise<MachineItem[]> {
      try {
        const items = await getMachineItems();
        return items.map(adaptMachineItem);
      } catch (error) {
        debug('Error in machineItems query:', error);
        throw error;
      }
    }
  },
  Mutation: {
    // Machine operations
    async createMachine(_, { input }, context) {
      const machine = await createMachine(input);
      return {
        code: 'CREATED',
        success: true,
        message: `Machine created: ${machine.id}`,
        machine: adaptMachine(machine)
      };
    },

    async updateMachine(_, { input }, context) {
      const machine = await updateMachine(input);
      return {
        code: 'UPDATED',
        success: true,
        message: `Machine updated: ${machine.id}`,
        machine: adaptMachine(machine)
      };
    },

    async deleteMachine(_, { id }, context) {
      await deleteMachine(id);
      return { code: 'DELETED', success: true, message: `Machine deleted: ${id}` };
    },

    // Item operations
    async createItem(_: any, { input }: { input: CreateItemInput }, context: InstaMunchContext) {
      const item = await createItem(input);
      return { code: 'CREATED', success: true, message: `Item created: ${item.id}`, item: adaptItemWithStringTimestamps(item) };
    },

    async updateItem(_: any, { input }: { input: UpdateItemInput }, context: InstaMunchContext) {
      const item = await updateItem(input);
      return { code: 'UPDATED', success: true, message: `Item updated: ${item.id}`, item: adaptItemWithStringTimestamps(item) };
    },

    async deleteItem(_, { id }: { id: string }, context: InstaMunchContext) {
      await deleteItem(id);
      return { code: 'DELETED', success: true, message: `Item deleted: ${id}` };
    },

    // Location operations
    async createLocation(_, { input }, context: InstaMunchContext) {
      const location = await createLocation(input);
      return {
        code: 'CREATED',
        success: true,
        message: `Location created: ${location.id}`,
        location: adaptLocation(location)
      };
    },

    async updateLocation(_, { input }, context: InstaMunchContext) {
      const location = await updateLocation(input);
      return {
        code: 'UPDATED',
        success: true,
        message: `Location updated: ${location.id}`,
        location: adaptLocation(location)
      };
    },

    async deleteLocation(_, { id }, context: InstaMunchContext) {
      await deleteLocation(id);
      return { code: 'DELETED', success: true, message: `Location deleted: ${id}` };
    },

    // MachineLocation operations
    async createMachineLocation(_, { input }, context: InstaMunchContext) {
      const machineLocation = await createMachineLocation(input);
      return {
        code: 'CREATED',
        success: true,
        message: `MachineLocation created: ${machineLocation.id}`,
        machineLocation: adaptMachineLocation(machineLocation)
      };
    },

    async updateMachineLocation(_, { input }, context: InstaMunchContext) {
      const machineLocation = await updateMachineLocation(input);
      return {
        code: 'UPDATED',
        success: true,
        message: `MachineLocation updated: ${machineLocation.id}`,
        machineLocation: adaptMachineLocation(machineLocation)
      };
    },

    async deleteMachineLocation(_, { id }, context: InstaMunchContext) {
      await deleteMachineLocation(id);
      return { code: 'DELETED', success: true, message: `MachineLocation deleted: ${id}` };
    },

    // MachineItem operations
    async createMachineItem(_, { input }, context: InstaMunchContext) {
      const machineItem = await createMachineItem(input);
      return {
        code: 'CREATED',
        success: true,
        message: `MachineItem created: ${machineItem.id}`,
        machineItem: adaptMachineItem(machineItem)
      };
    },

    async deleteMachineItem(_, { id }, context: InstaMunchContext) {
      await deleteMachineItem(id);
      return { code: 'DELETED', success: true, message: `MachineItem deleted: ${id} ` };
    },

    async updateMachineItems(_, { input }, context: InstaMunchContext) {
      try {
        const items = await updateMachineItems(input.machineId, input.itemIds);
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
