import { createMachine, deleteMachine, getMachines, getMachinesByLocation, updateMachine } from '../../dal/machine.dal';
import { debug } from 'node:util';
import { adaptMachine } from '../../adapters/model.adapters';
import { Resolvers } from '../../../generated/graphql';
import { InstaMunchContext } from '../context';

export const machineResolvers: Partial<Resolvers<InstaMunchContext>> = {
  Query: {
    async getMachines(_, {}, context) {
      try {
        const machines = await getMachines();
        debug(`${machines.length} Machines found`);
        return machines.map(adaptMachine);
      } catch (error: any) {
        debug('Error in machines query:', error);
        throw error;
      }
    },
    async getMachinesByLocation(_, { locationId }, context) {
      try {
        const machines = await getMachinesByLocation(locationId);
        debug(`${machines.length} Machines found for location ${locationId}`);
        return machines.map(adaptMachine);
      } catch (error: any) {
        debug('Error in getMachinesByLocation query:', error);
        throw error;
      }
    }
  },
  Mutation: {
    async createMachine(_, { input }, context) {
      const machine = await createMachine(input);
      debug(`Machine created with ID ${machine.id}`);
      return {
        code: '200',
        success: true,
        message: `Machine created: ${machine.id}`,
        machine: adaptMachine(machine)
      };
    },
    async updateMachine(_, { input }, context) {
      const machine = await updateMachine(input);
      debug(`Machine updated with ID ${machine!.id}`);
      return {
        code: '200',
        success: true,
        message: `Machine updated: ${machine!.id}`,
        machine: adaptMachine(machine!)
      };
    },
    async deleteMachine(_, { id }, context) {
      await deleteMachine(id);
      debug(`Machine deleted with ID ${id}`);
      return { code: '200', success: true, message: `Machine deleted: ${id}` };
    }
  }
};