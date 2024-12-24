import { InstaMunchContext } from '../context';
import { Resolvers } from '../../../generated/graphql';
import {
  createMachineLocation,
  deleteMachineLocation,
  getLocationsByMachineName,
  updateMachineLocation
} from '../../dal/machine.dal';
import { debug } from 'node:util';
import { adaptLocation, adaptMachineLocation } from '../../adapters/model.adapters';

export const machineLocationResolvers: Partial<Resolvers<InstaMunchContext>> = {
  Query: {
    async getLocationsByMachineName(_, { machineName }, context) {
      try {
        const locations = await getLocationsByMachineName(machineName);
        debug(`${locations.length} Locations found for machine name ${machineName}`);
        return locations.map(adaptLocation);
      } catch (error: any) {
        debug('Error in getLocationsByMachineName query:', error);
        throw error;
      }
    }
  },
  Mutation: {
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
    }
  }
};
