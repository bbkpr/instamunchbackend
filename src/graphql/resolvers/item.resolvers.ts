import { CreateItemInput, Resolvers, UpdateItemInput } from '../../../generated/graphql';
import { InstaMunchContext } from '../context';
import { createItem, deleteItem, getItems, updateItem } from '../../dal/machine.dal';
import { adaptItemWithStringTimestamps } from '../../adapters/model.adapters';
const debug = require('debug')('instamunchbackend:resolvers');

export const itemResolvers: Partial<Resolvers<InstaMunchContext>> = {
  Query: {
    async getItems(_, {}, context) {
      const items = await getItems();
      debug(`getItems: ${items.length} Items found`);
      return items.map(adaptItemWithStringTimestamps);
    }
  },
  Mutation: {
    async createItem(_: any, { input }: { input: CreateItemInput }, context: InstaMunchContext) {
      const item = await createItem(input);
      debug(`createItem created Item ${item.id} (${item.name})`);
      return {
        code: '200',
        success: true,
        message: `Item created: ${item.id}`,
        item: adaptItemWithStringTimestamps(item)
      };
    },

    async updateItem(_: any, { input }: { input: UpdateItemInput }, context: InstaMunchContext) {
      const item = await updateItem(input);
      debug(`updateItem updated Item ${item.id} (${item.name})`);
      return {
        code: '200',
        success: true,
        message: `Item updated: ${item.id}`,
        item: adaptItemWithStringTimestamps(item)
      };
    },

    async deleteItem(_, { id }: { id: string }, context: InstaMunchContext) {
      await deleteItem(id);
      debug(`deleteItem deleted Item ${id}`);
      return { code: '200', success: true, message: `Item deleted: ${id}` };
    }
  }
};