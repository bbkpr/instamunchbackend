import { InstaMunchContext } from '../context';
import { Resolvers } from '../../../generated/graphql';
import {
  createLocation,
  deleteLocation,
  getLocations,
  getLocationsByItem, getLocationsByMachineName,
  updateLocation
} from '../../dal/machine.dal';
import { adaptLocation } from '../../adapters/model.adapters';
import { debug } from 'node:util';

export const locationResolvers: Partial<Resolvers<InstaMunchContext>> = {
  Query: {
    async getLocations(_, {}, context) {
      try {
        const locations = await getLocations();
        debug(`${locations.length} Locations found`);
        return locations.map(adaptLocation);
      } catch (error: any) {
        debug('Error in locations query:', error);
        throw error;
      }
    },

    async getLocationsByItem(_, { itemId }, context) {
      try {
        const locations = await getLocationsByItem(itemId);
        debug(`${locations.length} Locations found for item ${itemId}`);
        return locations.map(adaptLocation);
      } catch (error: any) {
        debug('Error in getLocationsByItem query:', error);
        throw error;
      }
    },
  },
  Mutation: {
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
    }
  }
};
