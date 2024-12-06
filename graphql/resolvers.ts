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
