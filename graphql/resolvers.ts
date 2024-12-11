import {
  adaptItem,
  adaptLocation,
  adaptMachine,
  adaptMachineItem,
  adaptMachineLocation
} from '../adapters/model.adapters';

const debug = require('debug')('instamunchbackend:resolvers');
import { Machine, MachineItem, Resolvers } from '../generated/graphql';
import { InstaMunchContext } from './context';
import {
  addMachineItem, assignMachineLocation,
  createItem, createLocation,
  createMachine, createMachineLocation, deleteItem, deleteLocation,
  deleteMachine, deleteMachineLocation,
  getMachineItems,
  getMachines, removeMachineItem, removeMachineLocation, updateItem, updateLocation,
  updateMachine, updateMachineItems,
  updateMachineLocation
} from '../dal/machine.dal';

export const resolvers: Resolvers<InstaMunchContext> = {
  Query: {
    async machines(): Promise<Machine[]> {
      try {
        const machines = await getMachines();
        return machines.map(adaptMachine);
      } catch (error) {
        debug('Error in machines query:', error);
        throw error;
      }
    },
    async machineItems(): Promise<MachineItem[]> {
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
      return adaptMachine(machine);
    },

    async updateMachine(_, { input }, context) {
      const machine = await updateMachine(input);
      return adaptMachine(machine);
    },

    async deleteMachine(_, { id }, context) {
      return deleteMachine(id);
    },

    // Item operations
    async createItem(_, { input }, context) {
      const item = await createItem(input);
      return adaptItem(item);
    },

    async updateItem(_: any, { input }: any, context: any) {
      const item = await updateItem(input);
      return adaptItem(item);
    },

    async deleteItem(_, { id }, context) {
      return deleteItem(id);
    },

    // Location operations
    async createLocation(_, { input }, context) {
      const location = await createLocation(input);
      return adaptLocation(location);
    },

    async updateLocation(_, { input }, context) {
      const location = await updateLocation(input);
      return adaptLocation(location);
    },

    async deleteLocation(_, { id }, context) {
      return deleteLocation(id);
    },

    // MachineLocation operations
    async assignMachineLocation(_, { input }, context) {
      const machineLocation = await assignMachineLocation(input);
      return adaptMachineLocation(machineLocation);
    },

    async updateMachineLocation(_, { input }, context) {
      const machineLocation = await updateMachineLocation(input);
      return adaptMachineLocation(machineLocation);
    },

    async removeMachineLocation(_, { id }, context) {
      return removeMachineLocation(id);
    },

    // MachineItem operations
    async addMachineItem(_, { input }, context) {
      const machineItem = await addMachineItem(input);
      return adaptMachineItem(machineItem);
    },

    async updateMachineItems(_, { input }, context) {
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
    },

    async removeMachineItem(_, { machineId, itemId }, context) {
      return removeMachineItem(machineId, itemId);
    }
  }
};
