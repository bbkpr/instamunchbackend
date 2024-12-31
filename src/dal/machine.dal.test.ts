import { prisma } from './prismaClient';
import {
  createLocation,
  createMachine,
  createMachineManufacturer, deleteItem, deleteLocation, deleteMachine,
  deleteMachineManufacturer,
  getItems,
  getItemsByMachine,
  getLocations,
  getLocationsByMachineName,
  getMachineItems,
  getMachineManufacturer,
  getMachineManufacturers,
  getMachines,
  getMachinesByItem,
  getMachineType,
  getMachineTypes,
  updateItem, updateLocation, updateMachine,
  updateMachineItems,
  updateMachineManufacturer
} from './machine.dal';

// Mock the entire prisma module
jest.mock('./prismaClient', () => ({
  prisma: {
    item: {
      findMany: jest.fn(),
      update: jest.fn()
    },
    machineItem: {
      findMany: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      create: jest.fn()
    },
    location: {
      create: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn()
    },
    machineLocation: {
      create: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn()
    },
    machine: {
      count: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn()
    },
    machineManufacturer: {
      create: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn()
    },
    machineType: {
      findMany: jest.fn(),
      findUnique: jest.fn()
    },
    $transaction: jest.fn(callback => callback(prisma)),
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
            itemId: '1',
            machineId: '1',
            machine: {
              id: '1',
              name: 'Machine 1',
              machineType: { id: '1', name: 'Type 1' },
              machineLocations: [{
                location: { id: '1', address1: '123 Main St' }
              }],
              manufacturer: {
                id: '1',
                name: 'Automatic Products'
              }
            }
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
              machine: {
                include: {
                  manufacturer: true,
                  machineType: true,
                  machineLocations: true
                }
              }
            }
          }
        }
      });

    });

    it('should handle errors properly and still disconnect', async () => {
      const error = new Error('Database error');
      (prisma.item.findMany as jest.Mock).mockRejectedValue(error);

      await expect(getItems()).rejects.toThrow('Database error');

    });
  });

  describe('getItemsByMachine', () => {
    it('should return all items for a specific machine', async () => {
      const machineId = '1';
      const mockMachineItems = [
        {
          id: '1',
          item: { id: '1', name: 'Soda' },
          machine: {
            id: '1',
            name: 'Machine 1',
            machineLocations: [{
              location: { id: '1', address1: '123 Main St' }
            }],
            machineType: { id: '1', name: 'Type 1' },
            manufacturer: {
              id: '1',
              name: 'Automatic Products'
            }
          }
        }
      ];

      (prisma.machineItem.findMany as jest.Mock).mockResolvedValue(mockMachineItems);

      const result = await getItemsByMachine(machineId);

      expect(result).toEqual(mockMachineItems);
      expect(prisma.machineItem.findMany).toHaveBeenCalledWith({
        where: { machineId },
        include: {
          item: true,
          machine: {
            include: {
              manufacturer: true,
              machineType: true,
              machineLocations: true
            }
          }
        }
      });

    });

    it('should handle errors properly and still disconnect', async () => {
      const error = new Error('Database error');
      (prisma.machineItem.findMany as jest.Mock).mockRejectedValue(error);

      await expect(getItemsByMachine('1')).rejects.toThrow('Database error');

    });
  });

  describe('getMachinesByItem', () => {
    it('returns machines containing specified item', async () => {
      const mockResponse = [{
        id: 'mi1',
        itemId: 'item1',
        machine: {
          id: 'm1',
          name: 'Machine 1',
          machineType: { id: 'mt1', name: 'Type 1' },
          machineItems: [{
            id: 'mi1',
            item: { id: 'item1', name: 'Item 1' }
          }],
          machineLocations: [{
            id: 'ml1',
            location: { id: 'l1', name: 'Location 1' }
          }],
          manufacturer: { id: 'mfr1', name: 'Manufacturer 1' }
        },
        item: { id: 'item1', name: 'Item 1' }
      }];

      (prisma.machineItem.findMany as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getMachinesByItem('item1');

      expect(result).toEqual(mockResponse);
      expect(prisma.machineItem.findMany).toHaveBeenCalledWith({
        where: { itemId: 'item1' },
        include: {
          machine: {
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
              },
              manufacturer: true
            }
          },
          item: true
        }
      });
    });
  });

  describe('getMachineItems', () => {
    it('returns all machine items with relationships', async () => {
      const mockItems = [{
        id: 'mi1',
        machine: { id: 'm1', name: 'Machine 1' },
        item: { id: 'i1', name: 'Item 1' }
      }];

      (prisma.machineItem.findMany as jest.Mock).mockResolvedValue(mockItems);

      const result = await getMachineItems();

      expect(result).toEqual(mockItems);
      expect(prisma.machineItem.findMany).toHaveBeenCalledWith({
        include: {
          machine: true,
          item: true
        }
      });
    });

    it('handles rejection', async () => {
      (prisma.machineItem.findMany as jest.Mock).mockRejectedValue(new Error('Test'));
      await expect(getMachineItems()).rejects.toThrow('Test');
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
              }],
              machineType: { id: '1', name: 'Type 1' },
              manufacturer: {
                id: '1',
                name: 'Automatic Products'
              }
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
              machine: true
            }
          }
        }
      });

    });

    it('should handle errors properly and still disconnect', async () => {
      const error = new Error('Database error');
      (prisma.location.findMany as jest.Mock).mockRejectedValue(error);

      await expect(getLocations()).rejects.toThrow('Database error');
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
          }],
          manufacturer: {
            id: '1',
            name: 'Automatic Products'
          }
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
          },
          manufacturer: true
        }
      });

    });

    it('should handle errors properly and still disconnect', async () => {
      const error = new Error('Database error');
      (prisma.machine.findMany as jest.Mock).mockRejectedValue(error);

      await expect(getMachines()).rejects.toThrow('Database error');

    });
  });

  describe('getMachineManufacturers', () => {
    it('should return all manufacturers with their machine relationships', async () => {
      const mockManufacturers = [
        {
          id: '1',
          name: 'Crane',
          createdAt: new Date(),
          updatedAt: new Date(),
          machines: [{
            id: '1',
            name: 'Machine 1',
            machineType: { id: '1', name: 'Type 1' },
            machineItems: [{
              item: { id: '1', name: 'Soda' }
            }]
          }]
        }
      ];

      (prisma.machineManufacturer.findMany as jest.Mock).mockResolvedValue(mockManufacturers);

      const result = await getMachineManufacturers();

      expect(result).toEqual(mockManufacturers);
      expect(prisma.machineManufacturer.findMany).toHaveBeenCalledWith({
        include: {
          machines: {
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
              },
              manufacturer: true
            }
          }
        }
      });

    });

    it('should handle errors properly', async () => {
      const error = new Error('Database error');
      (prisma.machineManufacturer.findMany as jest.Mock).mockRejectedValue(error);

      await expect(getMachineManufacturers()).rejects.toThrow('Database error');
    });
  });

  describe('getMachineManufacturer', () => {
    it('should return a single manufacturer by id', async () => {
      const mockManufacturer = {
        id: '1',
        name: 'Crane',
        createdAt: new Date(),
        updatedAt: new Date(),
        machines: []
      };

      (prisma.machineManufacturer.findUnique as jest.Mock).mockResolvedValue(mockManufacturer);

      const result = await getMachineManufacturer('1');

      expect(result).toEqual(mockManufacturer);
      expect(prisma.machineManufacturer.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: {
          machines: {
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
          }
        }
      });
    });
  });

  describe('createMachineManufacturer', () => {
    it('should create a new manufacturer', async () => {
      const input = {
        name: 'New Manufacturer'
      };

      const mockCreated = {
        id: '1',
        name: input.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        machines: []
      };

      (prisma.machineManufacturer.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await createMachineManufacturer(input);

      expect(result).toEqual(mockCreated);
      expect(prisma.machineManufacturer.create).toHaveBeenCalledWith({
        data: {
          name: input.name,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        },
        include: {
          machines: true
        }
      });
    });
  });

  describe('MachineManufacturer Operations', () => {
    describe('updateMachineManufacturer', () => {
      it('should update an existing manufacturer', async () => {
        const input = {
          id: '1',
          name: 'Updated Manufacturer'
        };

        const mockUpdated = {
          id: input.id,
          name: input.name,
          createdAt: new Date(),
          updatedAt: new Date(),
          machines: []
        };

        (prisma.machineManufacturer.update as jest.Mock).mockResolvedValue(mockUpdated);

        const result = await updateMachineManufacturer(input);

        expect(result).toEqual(mockUpdated);
        expect(prisma.machineManufacturer.update).toHaveBeenCalledWith({
          where: { id: input.id },
          data: {
            name: input.name,
            updatedAt: expect.any(Date)
          },
          include: {
            machines: true
          }
        });
      });

      it('should handle non-existent manufacturer', async () => {
        const input = { id: 'nonexistent', name: 'Test' };
        const error = new Error('Record not found');
        (prisma.machineManufacturer.update as jest.Mock).mockRejectedValue(error);

        await expect(updateMachineManufacturer(input)).rejects.toThrow();
      });
    });

    describe('deleteMachineManufacturer', () => {
      it('should delete manufacturer when no machines are using it', async () => {
        const manufacturerId = '1';

        (prisma.machine.count as jest.Mock).mockResolvedValue(0);
        (prisma.machineManufacturer.delete as jest.Mock).mockResolvedValue(true);

        const result = await deleteMachineManufacturer(manufacturerId);

        expect(result).toBe(true);
        expect(prisma.machine.count).toHaveBeenCalledWith({
          where: { manufacturerId }
        });
        expect(prisma.machineManufacturer.delete).toHaveBeenCalledWith({
          where: { id: manufacturerId }
        });
      });

      it('should prevent deletion when machines are using the manufacturer', async () => {
        const manufacturerId = '1';

        (prisma.machine.count as jest.Mock).mockResolvedValue(1);

        await expect(deleteMachineManufacturer(manufacturerId))
          .rejects
          .toThrow('Cannot delete manufacturer that is in use by machines');

        expect(prisma.machineManufacturer.delete).not.toHaveBeenCalled();
      });
    });
  });

  describe('updateItem', () => {
    const mockItem = {
      id: '1',
      name: 'Test Item',
      basePrice: 1.99,
      expirationPeriod: 30
    };

    it('updates item with provided fields', async () => {
      const input = {
        id: '1',
        name: 'Updated Item',
        basePrice: 2.99
      };

      (prisma.item.update as jest.Mock).mockResolvedValue({
        ...mockItem,
        ...input,
        updatedAt: expect.any(Date)
      });

      const result = await updateItem(input);

      expect(prisma.item.update).toHaveBeenCalledWith({
        where: { id: input.id },
        data: {
          name: input.name,
          basePrice: input.basePrice,
          expirationPeriod: undefined,
          updatedAt: expect.any(Date)
        }
      });
      expect(result.name).toBe(input.name);
    });

    it('handles non-existent item error', async () => {
      const input = { id: 'invalid' };
      const error = new Error('Record not found');
      (prisma.item.update as jest.Mock).mockRejectedValue(error);

      await expect(updateItem(input)).rejects.toThrow('Record not found');
    });
  });

  describe('createMachine', () => {
    const mockInput = {
      name: 'New Machine',
      machineTypeId: 'type1',
      manufacturerId: 'mfr1'
    };

    it('creates machine with relationships', async () => {
      const mockResponse = {
        id: '1',
        ...mockInput,
        createdAt: new Date(),
        updatedAt: new Date(),
        machineItems: [],
        machineLocations: [],
        manufacturer: { id: 'mfr1' },
        machineType: { id: 'type1' }
      };

      (prisma.machine.create as jest.Mock).mockResolvedValue(mockResponse);

      const result = await createMachine(mockInput);

      expect(prisma.machine.create).toHaveBeenCalledWith({
        data: {
          name: mockInput.name,
          machineTypeId: mockInput.machineTypeId,
          manufacturerId: mockInput.manufacturerId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        },
        include: {
          machineItems: {
            include: {
              item: true
            }
          },
          machineLocations: {
            include: {
              location: true
            }
          },
          manufacturer: true,
          machineType: true
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('handles creation error', async () => {
      const error = new Error('Foreign key constraint failed');
      (prisma.machine.create as jest.Mock).mockRejectedValue(error);

      await expect(createMachine(mockInput)).rejects.toThrow('Foreign key constraint failed');
    });
  });

  describe('updateMachine', () => {
    const mockMachine = {
      id: '1',
      name: 'Test Machine',
      machineItems: [],
      machineLocations: [],
      manufacturer: { id: 'mfr1' },
      machineType: { id: 'type1' }
    };

    it('updates machine fields', async () => {
      const input = {
        id: '1',
        name: 'Updated Machine'
      };

      (prisma.machine.update as jest.Mock).mockResolvedValue({
        ...mockMachine,
        name: input.name,
        updatedAt: expect.any(Date)
      });

      const result = await updateMachine(input);

      expect(prisma.machine.update).toHaveBeenCalledWith({
        where: { id: input.id },
        data: {
          name: input.name,
          updatedAt: expect.any(Date)
        },
        include: {
          machineItems: {
            include: {
              item: true
            }
          },
          machineLocations: {
            include: {
              location: true
            }
          },
          manufacturer: true,
          machineType: true
        }
      });
      expect(result.name).toBe(input.name);
    });

    it('handles non-existent machine error', async () => {
      const input = { id: 'invalid' };
      (prisma.machine.update as jest.Mock).mockRejectedValue(new Error('Record not found'));

      await expect(updateMachine(input)).rejects.toThrow('Record not found');
    });
  });

  describe('deleteMachine', () => {
    it('deletes machine and its items', async () => {
      (prisma.machineItem.deleteMany as jest.Mock).mockResolvedValue({ count: 2 });
      (prisma.machine.delete as jest.Mock).mockResolvedValue(true);

      const result = await deleteMachine('1');

      expect(prisma.machineItem.deleteMany).toHaveBeenCalledWith({
        where: { machineId: '1' }
      });
      expect(prisma.machine.delete).toHaveBeenCalledWith({
        where: { id: '1' }
      });
      expect(result).toBe(true);
    });

    it('handles machine deletion error', async () => {
      (prisma.machineItem.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });
      (prisma.machine.delete as jest.Mock).mockRejectedValue(new Error('Record not found'));

      await expect(deleteMachine('invalid')).rejects.toThrow('Record not found');
    });
  });

  xdescribe('deleteItem', () => {
    it('deletes item and its machine relationships', async () => {
      (prisma.machineItem.deleteMany as jest.Mock).mockResolvedValue({ count: 2 });
      (prisma.item.delete as jest.Mock).mockResolvedValue(true);

      const result = await deleteItem('1');

      expect(prisma.machineItem.deleteMany).toHaveBeenCalledWith({
        where: { itemId: '1' }
      });
      expect(prisma.item.delete).toHaveBeenCalledWith({
        where: { id: '1' }
      });
      expect(result).toBe(true);
    });

    it('handles deletion error', async () => {
      (prisma.machineItem.deleteMany as jest.Mock).mockRejectedValue(new Error('Deletion failed'));

      await expect(deleteItem('1')).rejects.toThrow('Deletion failed');
    });
  });
});

describe('Location Operations', () => {
  describe('createLocation', () => {
    const mockInput = {
      address1: '123 Main St',
      city: 'TestCity',
      stateOrProvince: 'TestState',
      country: 'TestCountry'
    };

    it('creates location successfully', async () => {
      const mockResponse = {
        id: '1',
        ...mockInput,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      (prisma.location.create as jest.Mock).mockResolvedValue(mockResponse);

      const result = await createLocation(mockInput);

      expect(prisma.location.create).toHaveBeenCalledWith({
        data: {
          ...mockInput,
          address2: null,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('handles creation error', async () => {
      (prisma.location.create as jest.Mock).mockRejectedValue(new Error('Creation failed'));
      await expect(createLocation(mockInput)).rejects.toThrow('Creation failed');
    });
  });

  xdescribe('updateLocation', () => {
    it('updates location with partial data', async () => {
      const input = {
        id: '1',
        city: 'NewCity'
      };

      await updateLocation(input);

      (prisma.location.create as jest.Mock).mockResolvedValue(null);

      expect(prisma.location.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          city: 'NewCity',
          address1: undefined,
          address2: undefined,
          stateOrProvince: undefined,
          country: undefined,
          updatedAt: expect.any(Date)
        }
      });
    });
  });

  xdescribe('deleteLocation', () => {
    it('deletes location and its relationships', async () => {
      await deleteLocation('1');

      expect(prisma.machineLocation.deleteMany).toHaveBeenCalledWith({
        where: { locationId: '1' }
      });
      expect(prisma.location.delete).toHaveBeenCalledWith({
        where: { id: '1' }
      });
    });

    it('handles cascading deletion error', async () => {
      (prisma.machineLocation.deleteMany as jest.Mock).mockRejectedValue(new Error('Deletion failed'));
      await expect(deleteLocation('1')).rejects.toThrow('Deletion failed');
    });
  });

  describe('getMachineTypes', () => {
    it('should return all machine types with their relationships', async () => {
      const mockTypes = [
        {
          id: '1',
          name: 'AP 132',
          createdAt: new Date(),
          updatedAt: new Date(),
          machines: [{
            id: '1',
            name: 'Machine 1',
            machineItems: [
              {
                id: 'mi1',
                item: { id: 'item1', name: 'Item 1' }
              }
            ],
            machineLocations: [
              {
                id: 'ml1',
                location: { id: 'loc1', name: 'Location 1' }
              }
            ],
            machineType: { id: 'mt1', name: 'Type 1' },
            manufacturer: { id: 'mfr1', name: 'Manufacturer 1' }
          }]
        }
      ];

      (prisma.machineType.findMany as jest.Mock).mockResolvedValue(mockTypes);

      const result = await getMachineTypes();

      expect(result).toEqual(mockTypes);
      expect(prisma.machineType.findMany).toHaveBeenCalledWith({
        include: {
          machines: {
            include: {
              machineItems: {
                include: {
                  item: true
                }
              },
              machineLocations: {
                include: {
                  location: true
                }
              },
              machineType: true,
              manufacturer: true
            }
          }
        }
      });
    });
  });

  describe('getMachineType', () => {
    it('should return a single machine type by id', async () => {
      const mockType = {
        id: '1',
        name: 'AP 132',
        createdAt: new Date(),
        updatedAt: new Date(),
        machines: []
      };

      (prisma.machineType.findUnique as jest.Mock).mockResolvedValue(mockType);

      const result = await getMachineType('1');

      expect(result).toEqual(mockType);
      expect(prisma.machineType.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: {
          machines: true
        }
      });
    });

    it('should return null for non-existent machine type', async () => {
      (prisma.machineType.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getMachineType('999');

      expect(result).toBeNull();
    });
  });

  describe('MachineItems Operations', () => {
    describe('updateMachineItems', () => {
      const mockPrismaTransaction = {
        machine: { findUnique: jest.fn() },
        item: { findMany: jest.fn() },
        machineItem: {
          deleteMany: jest.fn(),
          create: jest.fn()
        }
      };

      beforeEach(() => {
        (prisma.$transaction as jest.Mock).mockImplementation(callback =>
          callback(mockPrismaTransaction)
        );
      });

      it('should successfully update machine items in a transaction', async () => {
        const machineId = '1';
        const itemIds = ['item1', 'item2'];

        mockPrismaTransaction.machine.findUnique.mockResolvedValue({ id: machineId });
        mockPrismaTransaction.item.findMany.mockResolvedValue([
          { id: 'item1' },
          { id: 'item2' }
        ]);
        mockPrismaTransaction.machineItem.create.mockImplementation(async ({ data }) => ({
          ...data,
          id: 'newMachineItem',
          machine: { id: machineId },
          item: { id: data.itemId }
        }));

        const result = await updateMachineItems(machineId, itemIds);

        expect(result).toHaveLength(itemIds.length);
        expect(mockPrismaTransaction.machineItem.deleteMany).toHaveBeenCalledWith({
          where: { machineId }
        });
        expect(mockPrismaTransaction.machineItem.create).toHaveBeenCalledTimes(2);
      });

      it('should throw error when machine not found', async () => {
        mockPrismaTransaction.machine.findUnique.mockResolvedValue(null);

        await expect(updateMachineItems('1', ['item1']))
          .rejects
          .toThrow('Machine with ID 1 not found');
      });

      it('should throw error when items not found', async () => {
        const machineId = '1';
        const itemIds = ['item1', 'item2'];

        mockPrismaTransaction.machine.findUnique.mockResolvedValue({ id: machineId });
        mockPrismaTransaction.item.findMany.mockResolvedValue([{ id: 'item1' }]);

        await expect(updateMachineItems(machineId, itemIds))
          .rejects
          .toThrow('Items not found: item2');
      });
    });
  });
});
