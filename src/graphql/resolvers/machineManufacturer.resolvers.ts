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
import { debug } from 'node:util';

export const machineManufacturerResolvers: Partial<Resolvers<InstaMunchContext>> = {
  Query: {
    async getMachineManufacturers(_, {}, context) {
      try {
        const manufacturers = await getMachineManufacturers();
        debug(`${manufacturers.length} MachineManufacturers found`);
        return manufacturers.map(manufacturer => ({
          id: manufacturer.id,
          name: manufacturer.name,
          createdAt: manufacturer.createdAt.toISOString(),
          updatedAt: manufacturer.updatedAt.toISOString(),
          machines: manufacturer.machines?.map(adaptMachine) || []
        }));
      } catch (error: any) {
        debug('Error in machineManufacturers query:', error);
        throw error;
      }
    },

    async getMachineManufacturer(_, { id }, context) {
      try {
        const manufacturer = await getMachineManufacturer(id);
        if (!manufacturer) return null;
        return {
          id: manufacturer.id,
          name: manufacturer.name,
          createdAt: manufacturer.createdAt.toISOString(),
          updatedAt: manufacturer.updatedAt.toISOString(),
          machines: manufacturer.machines?.map(adaptMachine) || []
        };
      } catch (error: any) {
        debug('Error in machineManufacturer query:', error);
        throw error;
      }
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
        debug(`Created manufacturer '${manufacturer.name}' with ID ${manufacturer.id}`);

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
        debug('Failed to create manufacturer:', error);
        return {
          code: '500',
          success: false,
          message: error instanceof Error ? error.message : 'Failed to create manufacturer'
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
        debug(`Updated manufacturer ${manufacturer.id}`);

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
        debug('Failed to update manufacturer:', error);
        return {
          code: '500',
          success: false,
          message: error instanceof Error ? error.message : 'Failed to update manufacturer'
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
        debug(`Deleted manufacturer ${id}`);

        return {
          code: '200',
          success: true,
          message: 'Manufacturer deleted successfully'
        };
      } catch (error: any) {
        debug('Failed to delete manufacturer:', error);
        return {
          code: '500',
          success: false,
          message: error instanceof Error ? error.message : 'Failed to delete manufacturer'
        };
      }
    }
  }
};
