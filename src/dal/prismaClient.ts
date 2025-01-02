import { PrismaClient } from '@prisma/client';

const debug = require('debug')('instamunchbackend:prismaclient');

/**
 * Prisma client with Event-based logging (see https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging#event-based-logging)
 */
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    },
    {
      emit: 'stdout',
      level: 'error'
    },
    {
      emit: 'stdout',
      level: 'info'
    },
    {
      emit: 'stdout',
      level: 'warn'
    }
  ]
});

prisma.$on('query', (e) => {
  debug('Query: ' + e.query + ' (' + e.duration + 'ms)');
  debug('Params: ' + e.params);
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export { prisma };