import { InstaMunchContext } from '../context';
import { Resolvers } from '../../../generated/graphql';
import {
  createMachineType,
  deleteMachineType,
  getMachineType,
  getMachineTypes,
  updateMachineType
} from '../../dal/machine.dal';
import { adaptMachine } from '../../adapters/model.adapters';
import { debug } from 'node:util';

export const machineTypeResolvers: Partial<Resolvers<InstaMunchContext>> = {
  Query: {
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
      } catch (error: any) {
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
      } catch (error: any) {
        debug('Error in machineType query:', error);
        throw error;
      }
    }
  },
  Mutation: {
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
    }
  }
};
