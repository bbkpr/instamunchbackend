import { InstaMunchContext } from '../context';
import { MachineItem, Resolvers } from '../../../generated/graphql';
import {
  createMachineItem,
  deleteMachineItem,
  getItemsByMachine,
  getMachineItems,
  getMachinesByItem, updateMachineItems
} from '../../dal/machine.dal';
import { adaptMachineItem } from '../../adapters/model.adapters';
const debug = require('debug')('instamunchbackend:resolvers');

export const machineItemResolvers: Partial<Resolvers<InstaMunchContext>> = {
  Query: {
    async getItemsByMachine(_, { machineId }, context) {
      const items = await getItemsByMachine(machineId);
      debug(`getItemsByMachine found ${items.length} Items in Machine ${machineId}`);
      return items.map(adaptMachineItem);
    },
    async getMachineItems(): Promise<MachineItem[]> {
      const items = await getMachineItems();
      debug(`${items.length} MachineItems found`);
      return items.map(adaptMachineItem);
    },
    async getMachinesByItem(_, { itemId }, context) {
      const machines = await getMachinesByItem(itemId);
      debug(`${machines.length} Machines found for item ${itemId}`);
      return machines.map(adaptMachineItem);
    }
  },
  Mutation: {
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
