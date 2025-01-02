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
const debug = require('debug')('instamunchbackend:resolvers');

export const locationResolvers: Partial<Resolvers<InstaMunchContext>> = {
  Query: {
    async getLocations(_, {}, context) {
      const locations = await getLocations();
      debug(`getLocations found ${locations.length} Locations`);
      return locations.map(adaptLocation);
    },
    async getLocationsByItem(_, { itemId }, context) {
      const locations = await getLocationsByItem(itemId);
      debug(`getLocationsByItem found ${locations.length} Locations with Item ${itemId}`);
      return locations.map(adaptLocation);
    }
  },
  Mutation: {
    async createLocation(_, { input }, context: InstaMunchContext) {
      const location = await createLocation(input);
      debug(`createLocation created Location ${location.id} (${location.address1})`);
      return {
        code: '200',
        success: true,
        message: `Location created: ${location.id}`,
        location: adaptLocation(location)
      };
    },

    async updateLocation(_, { input }, context: InstaMunchContext) {
      const location = await updateLocation(input);
      debug(`updateLocation updated Location ${location.id} (${location.address1})`);
      return {
        code: '200',
        success: true,
        message: `Location updated: ${location.id}`,
        location: adaptLocation(location)
      };
    },

    async deleteLocation(_, { id }, context: InstaMunchContext) {
      await deleteLocation(id);
      debug(`deleteLocation deleted Location ${id}`);
      return { code: '200', success: true, message: `Location deleted: ${id}` };
    }
  }
};
