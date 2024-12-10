import pg from 'pg';

const { Client } = pg;
const client = new Client();
await client.connect();

export const resolvers = {
  Query: {
    machines() {
      return [{ name: 'Machine 1', items: [{ name: 'Item 1' }] }, { name: 'Machine 2', items: [{ name: 'Item 2A' }] }];
    },
    machineItems() {
      return [[{ name: 'Item 2A', machines: [{ name: 'Machine 2' }] }]];
    }
  }
};
