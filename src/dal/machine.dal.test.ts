import { prisma } from './prismaClient';
import {
  getItems,
  getItemsByMachine,
  getLocations,
  getLocationsByMachineName,
  getMachines
} from './machine.dal';

// Mock the entire prisma module
jest.mock('./prismaClient', () => ({
  prisma: {
    item: {
      findMany: jest.fn()
    },
    machineItem: {
      findMany: jest.fn()
    },
    location: {
      findMany: jest.fn()
    },
    machine: {
      findMany: jest.fn()
    },
    $disconnect: jest.fn()
  }
}));

describe('Machine DAL Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getItems', () => {
    it('should return all items with their machine relationships', async () => {
      const mockItems = [
        {
          id: '1',
          name: 'Soda',
          basePrice: 1.99,
          expirationPeriod: 90,
          machineItems: [{
            machine: { id: '1', name: 'Machine 1' }
          }]
        }
      ];

      (prisma.item.findMany as jest.Mock).mockResolvedValue(mockItems);

      const result = await getItems();

      expect(result).toEqual(mockItems);
      expect(prisma.item.findMany).toHaveBeenCalledWith({
        include: {
          machineItems: {
            include: {
              machine: true
            }
          }
        }
      });
      expect(prisma.$disconnect).toHaveBeenCalled();
    });

    it('should handle errors properly and still disconnect', async () => {
      const error = new Error('Database error');
      (prisma.item.findMany as jest.Mock).mockRejectedValue(error);

      await expect(getItems()).rejects.toThrow('Database error');
      expect(prisma.$disconnect).toHaveBeenCalled();
    });
  });

  describe('getItemsByMachine', () => {
    it('should return all items for a specific machine', async () => {
      const machineId = '1';
      const mockMachineItems = [
        {
          id: '1',
          item: { id: '1', name: 'Soda' },
          machine: { id: '1', name: 'Machine 1' }
        }
      ];

      (prisma.machineItem.findMany as jest.Mock).mockResolvedValue(mockMachineItems);

      const result = await getItemsByMachine(machineId);

      expect(result).toEqual(mockMachineItems);
      expect(prisma.machineItem.findMany).toHaveBeenCalledWith({
        where: { machineId },
        include: {
          item: true,
          machine: true
        }
      });
      expect(prisma.$disconnect).toHaveBeenCalled();
    });

    it('should handle errors properly and still disconnect', async () => {
      const error = new Error('Database error');
      (prisma.machineItem.findMany as jest.Mock).mockRejectedValue(error);

      await expect(getItemsByMachine('1')).rejects.toThrow('Database error');
      expect(prisma.$disconnect).toHaveBeenCalled();
    });
  });

  describe('getLocations', () => {
    it('should return all locations with their machine relationships', async () => {
      const mockLocations = [
        {
          id: '1',
          address1: '123 Main St',
          city: 'City',
          stateOrProvince: 'State',
          country: 'Country',
          machineLocations: [{
            machine: {
              id: '1',
              name: 'Machine 1',
              machineItems: [{
                item: { id: '1', name: 'Soda' }
              }]
            }
          }]
        }
      ];

      (prisma.location.findMany as jest.Mock).mockResolvedValue(mockLocations);

      const result = await getLocations();

      expect(result).toEqual(mockLocations);
      expect(prisma.location.findMany).toHaveBeenCalledWith({
        include: {
          machineLocations: {
            include: {
              machine: {
                include: {
                  machineItems: {
                    include: {
                      item: true
                    }
                  }
                }
              }
            }
          }
        }
      });
      expect(prisma.$disconnect).toHaveBeenCalled();
    });

    it('should handle errors properly and still disconnect', async () => {
      const error = new Error('Database error');
      (prisma.location.findMany as jest.Mock).mockRejectedValue(error);

      await expect(getLocations()).rejects.toThrow('Database error');
      expect(prisma.$disconnect).toHaveBeenCalled();
    });
  });

  describe('getLocationsByMachineName', () => {
    it('should return all locations with a specific machine name', async () => {
      const machineName = 'Test Machine';
      const mockLocations = [
        {
          id: '1',
          address1: '123 Main St',
          machineLocations: [{
            machine: { id: '1', name: 'Test Machine' }
          }]
        }
      ];

      (prisma.location.findMany as jest.Mock).mockResolvedValue(mockLocations);

      const result = await getLocationsByMachineName(machineName);

      expect(result).toEqual(mockLocations);
      expect(prisma.location.findMany).toHaveBeenCalledWith({
        where: {
          machineLocations: {
            some: {
              machine: {
                name: {
                  contains: machineName,
                  mode: 'insensitive'
                }
              }
            }
          }
        },
        include: {
          machineLocations: {
            include: {
              machine: true
            }
          }
        }
      });
      expect(prisma.$disconnect).toHaveBeenCalled();
    });

    it('should handle errors properly and still disconnect', async () => {
      const error = new Error('Database error');
      (prisma.location.findMany as jest.Mock).mockRejectedValue(error);

      await expect(getLocationsByMachineName('Test')).rejects.toThrow('Database error');
      expect(prisma.$disconnect).toHaveBeenCalled();
    });
  });

  describe('getMachines', () => {
    it('should return all machines with their relationships', async () => {
      const mockMachines = [
        {
          id: '1',
          name: 'Machine 1',
          machineType: { id: '1', name: 'Type 1' },
          machineItems: [{
            item: { id: '1', name: 'Soda' }
          }],
          machineLocations: [{
            location: { id: '1', address1: '123 Main St' }
          }]
        }
      ];

      (prisma.machine.findMany as jest.Mock).mockResolvedValue(mockMachines);

      const result = await getMachines();

      expect(result).toEqual(mockMachines);
      expect(prisma.machine.findMany).toHaveBeenCalledWith({
        include: {
          machineType: true,
          machineItems: {
            include: {
              item: true
            }
          },
          machineLocations: {
            include: {
              location: true
            }
          }
        }
      });
      expect(prisma.$disconnect).toHaveBeenCalled();
    });

    it('should handle errors properly and still disconnect', async () => {
      const error = new Error('Database error');
      (prisma.machine.findMany as jest.Mock).mockRejectedValue(error);

      await expect(getMachines()).rejects.toThrow('Database error');
      expect(prisma.$disconnect).toHaveBeenCalled();
    });
  });
});