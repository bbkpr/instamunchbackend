const debug = require('debug')('instamunchbackend:resolvers');
import { Machine, MachineItem, Resolvers } from '../generated/graphql';
import { InstaMunchContext } from './context';
import { createMachine } from '../dal/machine.dal';

export const resolvers: Resolvers<InstaMunchContext> = {
  Query: {
    machines(): Machine[] {
      return [{ id: '1', name: 'Machine 1', items: [{ id: '1', name: 'Item 1' }] }, {
        id: '2',
        name: 'Machine 2',
        items: [{ id: '2', name: 'Item 2A' }]
      }];
    },
    machineItems(): MachineItem[] {
      return [{ id: '1', name: 'Item 1' }];
    }
  },
  Mutation: {
    async createMachine(parent, args, context, info) {
      const newMachine = await createMachine({ name: args.machine?.name });
      return newMachine!;
    }
  }
};
