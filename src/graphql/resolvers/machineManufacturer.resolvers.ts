import { InstaMunchContext } from '../context';
import {
  CreateMachineManufacturerInput,
  Resolvers,
  UpdateMachineManufacturerInput
} from '../../../generated/graphql';
import {
  createMachineManufacturer,
  deleteMachineManufacturer,
  getMachineManufacturer,
  getMachineManufacturers,
  updateMachineManufacturer
} from '../../dal/machine.dal';
import { adaptMachine } from '../../adapters/model.adapters';

const debug = require('debug')('instamunchbackend:resolvers');

export const machineManufacturerResolvers: Partial<Resolvers<InstaMunchContext>> = {
  Query: {
    async getMachineManufacturers(_, {}, context) {
      const manufacturers = await getMachineManufacturers();
      debug(`getMachineManufacturers found ${manufacturers.length} MachineManufacturers`);
      return manufacturers.map(manufacturer => ({
        id: manufacturer.id,
        name: manufacturer.name,
        createdAt: manufacturer.createdAt.toISOString(),
        updatedAt: manufacturer.updatedAt.toISOString(),
        machines: manufacturer.machines?.map(adaptMachine) || []
      }));
    },

    async getMachineManufacturer(_, { id }, context) {
      const manufacturer = await getMachineManufacturer(id);
      if (!manufacturer) {
        debug(`getMachineManufacturer failed to find MachineManufacturer ${id}`);
        return null;
      }
      debug(`getMachineManufacturer found MachineManufacturer ${id} (${manufacturer.name})`);
      return {
        id: manufacturer.id,
        name: manufacturer.name,
        createdAt: manufacturer.createdAt.toISOString(),
        updatedAt: manufacturer.updatedAt.toISOString(),
        machines: manufacturer.machines?.map(adaptMachine) || []
      };
    }
  },
  Mutation: {
    async createMachineManufacturer(
      _: any,
      { input }: { input: CreateMachineManufacturerInput },
      context: InstaMunchContext
    ) {
      try {
        const manufacturer = await createMachineManufacturer(input);
        debug(`createMachineManufacturer created MachineManufacturer ${manufacturer.id} (${manufacturer.name})`);

        return {
          code: '200',
          success: true,
          message: `Manufacturer created successfully`,
          manufacturer: {
            id: manufacturer.id,
            name: manufacturer.name,
            createdAt: manufacturer.createdAt.toISOString(),
            updatedAt: manufacturer.updatedAt.toISOString(),
            machines: manufacturer.machines?.map(adaptMachine) || []
          }
        };
      } catch (error: any) {
        debug('createMachineManufacturer failed to create MachineManufacturer:', error);
        return {
          code: '500',
          success: false,
          message: error instanceof Error ? error.message : 'Failed to create MachineManufacturer'
        };
      }
    },

    async updateMachineManufacturer(
      _: any,
      { input }: { input: UpdateMachineManufacturerInput },
      context: InstaMunchContext
    ) {
      try {
        const manufacturer = await updateMachineManufacturer(input);
        debug(`updateMachineManufacturer updated MachineManufacturer ${input.id} (${input.name})`);

        return {
          code: '200',
          success: true,
          message: `Manufacturer updated successfully`,
          manufacturer: {
            id: manufacturer.id,
            name: manufacturer.name,
            createdAt: manufacturer.createdAt.toISOString(),
            updatedAt: manufacturer.updatedAt.toISOString(),
            machines: manufacturer.machines?.map(adaptMachine) || []
          }
        };
      } catch (error: any) {
        debug(`updateMachineManufacturer failed to update MachineManufacturer ${input.id} (${input.name}):`, error);
        return {
          code: '500',
          success: false,
          message: error instanceof Error ? error.message : 'Failed to update MachineManufacturer'
        };
      }
    },

    async deleteMachineManufacturer(
      _: any,
      { id }: { id: string },
      context: InstaMunchContext
    ) {
      try {
        await deleteMachineManufacturer(id);
        debug(`deleteMachineManufacturer deleted MachineManufacturer ${id}`);

        return {
          code: '200',
          success: true,
          message: 'Manufacturer deleted successfully'
        };
      } catch (error: any) {
        debug(`deleteMachineManufacturer failed to delete MachineManufacturer ${id}:`, error);
        return {
          code: '500',
          success: false,
          message: error instanceof Error ? error.message : 'Failed to delete MachineManufacturer'
        };
      }
    }
  }
};
