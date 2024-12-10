const debug = require('debug')('instamunchbackend:dal');
import { CreateMachineInput } from '../generated/graphql';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMachine = async (createMachineInput: Partial<CreateMachineInput>) => {
  try {
    const createdMachine = await prisma.machine.create({ data: createMachineInput });
    await prisma.$disconnect()
    return createdMachine;
  } catch (e: any) {
    console.error(`Error creating Machine - ${e.name}: ${e.message}`);
    await prisma.$disconnect();
  }
};