import { CreateItemInput, Resolvers, UpdateItemInput } from '../../../generated/graphql';
import { InstaMunchContext } from '../context';
import { createItem, deleteItem, getItems, updateItem } from '../../dal/machine.dal';
import { debug } from 'node:util';
import { adaptItemWithStringTimestamps } from '../../adapters/model.adapters';

export const itemResolvers: Partial<Resolvers<InstaMunchContext>> = {
  Query: {
    async getItems(_, {}, context) {
      try {
        const items = await getItems();
        debug(`${items.length} Items found`);
        return items.map(item => ({
          id: item.id,
          name: item.name,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString(),
          basePrice: item.basePrice,
          expirationPeriod: item.expirationPeriod
        }));
      } catch (error: any) {
        debug('Error in machines query:', error);
        throw error;
      }
    }
  },
  Mutation: {
    async createItem(_: any, { input }: { input: CreateItemInput }, context: InstaMunchContext) {
      const item = await createItem(input);
      debug(`Item created with ID ${item.id}, Name: ${item.name}`);
      return {
        code: '200',
        success: true,
        message: `Item created: ${item.id}`,
        item: adaptItemWithStringTimestamps(item)
      };
    },

    async updateItem(_: any, { input }: { input: UpdateItemInput }, context: InstaMunchContext) {
      const item = await updateItem(input);
      debug(`Item updated with ID ${item.id}, Name: ${item.name}`);
      return {
        code: '200',
        success: true,
        message: `Item updated: ${item.id}`,
        item: adaptItemWithStringTimestamps(item)
      };
    },

    async deleteItem(_, { id }: { id: string }, context: InstaMunchContext) {
      await deleteItem(id);
      debug(`Item deleted with ID ${id}`);
      return { code: '200', success: true, message: `Item deleted: ${id}` };
    }
  }
};