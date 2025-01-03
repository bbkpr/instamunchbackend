import { InstaMunchContext } from '../context';
import { Resolvers } from '../../../generated/graphql';
import {
  createMachineType,
  deleteMachineType,
  getMachineType,
  getMachineTypes,
  updateMachineType
} from '../../dal/machine.dal';
import { adaptMachine, adaptMachineType } from '../../adapters/model.adapters';

const debug = require('debug')('instamunchbackend:resolvers');

export const machineTypeResolvers: Partial<Resolvers<InstaMunchContext>> = {
  Query: {
    async getMachineTypes(_, {}, context) {
      try {
        const types = await getMachineTypes();
        debug(`getMachineTypes found ${types.length} MachineTypes`);
        return types.map(adaptMachineType);
      } catch (error: any) {
        debug('Error in machineTypes query:', error);
        throw error;
      }
    },

    async getMachineType(_, { id }, context) {
      const type = await getMachineType(id);
      if (!type) {
        debug(`getMachineType failed to find MachineType ${id}`);
        return null;
      }
      debug(`getMachineType found MachineType ${id} (${type.name})`);
      return adaptMachineType(type);
    }
  },
  Mutation: {
    async createMachineType(_, { input }, context) {
      try {
        const machineType = await createMachineType(input);
        debug(`createMachineType created MachineType ${machineType.id} (${machineType.name})`);
        return {
          code: '200',
          success: true,
          message: 'Machine type created successfully',
          machineType: adaptMachineType(machineType)
        };
      } catch (error) {
        debug('createMachineType failed to create MachineType:', error);
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
        debug(`updateMachineType updated MachineType ${input.id} (${input.name})`);
        return {
          code: '200',
          success: true,
          message: 'Machine type updated successfully',
          machineType: adaptMachineType(machineType)
        };
      } catch (error) {
        debug(`updateMachineType failed to update MachineType ${input.id} (${input.name}):`, error);
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
        debug(`deleteMachineManufacturer deleted MachineManufacturer ${id}`);
        return {
          code: '200',
          success: true,
          message: 'Machine type deleted successfully'
        };
      } catch (error) {
        debug(`deleteMachineManufacturer failed to delete MachineManufacturer ${id}:`, error);
        return {
          code: '500',
          success: false,
          message: (error as any).message
        };
      }
    }
  }
};
