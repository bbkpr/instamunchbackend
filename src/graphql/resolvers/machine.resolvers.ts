import { createMachine, deleteMachine, getMachines, getMachinesByLocation, updateMachine } from '../../dal/machine.dal';
import { adaptMachine } from '../../adapters/model.adapters';
import { Resolvers } from '../../../generated/graphql';
import { InstaMunchContext } from '../context';

const debug = require('debug')('instamunchbackend:resolvers');

export const machineResolvers: Partial<Resolvers<InstaMunchContext>> = {
  Query: {
    async getMachines(_, {}, context) {
      const machines = await getMachines();
      debug(`getMachines found ${machines.length} Machines`);
      return machines.map(adaptMachine);
    },
    async getMachinesByLocation(_, { locationId }, context) {
      const machines = await getMachinesByLocation(locationId);
      debug(`getMachinesByLocation found ${machines.length} Machines at Location ${locationId}`);
      return machines.map(adaptMachine);
    }
  },
  Mutation: {
    async createMachine(_, { input }, context) {
      const machine = await createMachine(input);
      debug(`createMachine created Machine ${machine.id}`);
      return {
        code: '200',
        success: true,
        message: `Machine created: ${machine.id}`,
        machine: adaptMachine(machine)
      };
    },
    async updateMachine(_, { input }, context) {
      const machine = await updateMachine(input);
      debug(`updateMachine updated Machine ${machine!.id}`);
      return {
        code: '200',
        success: true,
        message: `Machine updated: ${machine!.id}`,
        machine: adaptMachine(machine!)
      };
    },
    async deleteMachine(_, { id }, context) {
      await deleteMachine(id);
      debug(`deleteMachine deleted Machine ${id}`);
      return { code: '200', success: true, message: `Machine deleted: ${id}` };
    }
  }
};