import { InstaMunchContext } from '../context';
import { Resolvers } from '../../../generated/graphql';
import {
  createMachineLocation,
  deleteMachineLocation,
  getLocationsByMachineName, getMachineLocations,
  updateMachineLocation
} from '../../dal/machine.dal';
import { adaptLocation, adaptMachineLocation } from '../../adapters/model.adapters';

const debug = require('debug')('instamunchbackend:resolvers');

export const machineLocationResolvers: Partial<Resolvers<InstaMunchContext>> = {
  Query: {
    async getLocationsByMachineName(_, { machineName }, context) {
      try {
        const locations = await getLocationsByMachineName(machineName);
        debug(`getLocationsByMachineName found ${locations.length} Locations with a Machine named ${machineName}`);
        return locations.map(adaptLocation);
      } catch (error: any) {
        debug('Error in getLocationsByMachineName query:', error);
        throw error;
      }
    },
    async getMachineLocations(_, {}, context) {
      try {
        const machineLocations = await getMachineLocations();
        debug(`getMachineLocations found ${machineLocations.length} MachineLocations`);
        return machineLocations.map(adaptMachineLocation);
      } catch (error: any) {
        debug('Error in getMachineLocations query:', error);
        throw error;
      }
    }
  },
  Mutation: {
    async createMachineLocation(_, { input }, context: InstaMunchContext) {
      const machineLocation = await createMachineLocation(input);
      debug(`createMachineLocation created MachineLocation ${machineLocation.id}`);
      return {
        code: '200',
        success: true,
        message: `MachineLocation created: ${machineLocation.id}`,
        machineLocation: adaptMachineLocation(machineLocation)
      };
    },

    async updateMachineLocation(_, { input }, context: InstaMunchContext) {
      const machineLocation = await updateMachineLocation(input);
      debug(`updateMachineLocation updated MachineLocation ${machineLocation.id}`);
      return {
        code: '200',
        success: true,
        message: `MachineLocation updated: ${machineLocation.id}`,
        machineLocation: adaptMachineLocation(machineLocation)
      };
    },

    async deleteMachineLocation(_, { id }, context: InstaMunchContext) {
      await deleteMachineLocation(id);
      debug(`deleteMachineLocation deleted MachineLocation ${id}`);
      return { code: '200', success: true, message: `MachineLocation deleted: ${id}` };
    }
  }
};
