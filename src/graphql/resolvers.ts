import { Resolvers } from '../../generated/graphql';
import { InstaMunchContext } from './context';
import { itemResolvers } from './resolvers/item.resolvers';
import { locationResolvers } from './resolvers/location.resolvers';
import { machineResolvers } from './resolvers/machine.resolvers';
import { machineItemResolvers } from './resolvers/machineItem.resolvers';
import { machineLocationResolvers } from './resolvers/machineLocation.resolvers';
import { machineManufacturerResolvers } from './resolvers/machineManufacturer.resolvers';
import { machineTypeResolvers } from './resolvers/machineType.resolvers';
import { authResolvers } from './resolvers/auth.resolvers';

export const resolvers: Resolvers<InstaMunchContext> = {
  Query: {
    ...authResolvers.Query,
    ...itemResolvers.Query,
    ...locationResolvers.Query,
    ...machineResolvers.Query,
    ...machineItemResolvers.Query,
    ...machineLocationResolvers.Query,
    ...machineManufacturerResolvers.Query,
    ...machineTypeResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...itemResolvers.Mutation,
    ...locationResolvers.Mutation,
    ...machineResolvers.Mutation,
    ...machineItemResolvers.Mutation,
    ...machineLocationResolvers.Mutation,
    ...machineManufacturerResolvers.Mutation,
    ...machineTypeResolvers.Mutation,
  }
};
