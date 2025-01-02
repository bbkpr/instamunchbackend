import { prisma } from './prismaClient';
import {
  createItem,
  createLocation,
  createMachine,
  createMachineItem,
  createMachineLocation,
  createMachineManufacturer,
  createMachineType,
  deleteItem,
  deleteLocation,
  deleteMachine,
  deleteMachineItem,
  deleteMachineLocation,
  deleteMachineManufacturer,
  deleteMachineType,
  getItems,
  getItemsByMachine,
  getLocations,
  getLocationsByItem,
  getLocationsByMachineName,
  getMachineItems,
  getMachineLocations,
  getMachineManufacturer,
  getMachineManufacturers,
  getMachines,
  getMachinesByItem,
  getMachinesByLocation,
  getMachineType,
  getMachineTypes,
  updateItem,
  updateLocation,
  updateMachine,
  updateMachineItems,
  updateMachineLocation,
  updateMachineManufacturer,
  updateMachineType
} from './machine.dal';
import { CreateItemInput } from '../../generated/graphql';

// Mock the entire prisma module
jest.mock('./prismaClient', () => ({
  prisma: {
    item: {
      create: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn()
    },
    machineItem: {
      create: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      findMany: jest.fn()
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
      deleteMany: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn()
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
      create: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn()
    },
    $transaction: jest.fn(callback => callback(prisma)),
    $disconnect: jest.fn()
  }
}));

describe('Machine DAL Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Item Operations', () => {
    describe('createItem', () => {
      const mockInput = {
        name: 'New Item',
        basePrice: 1.99,
        expirationPeriod: 30
      };

      it('creates item with all required fields', async () => {
        const mockResponse = {
          id: 'i1',
          ...mockInput,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        (prisma.item.create as jest.Mock).mockResolvedValue(mockResponse);

        const result = await createItem(mockInput);

        expect(prisma.item.create).toHaveBeenCalledWith({
          data: {
            name: mockInput.name,
            basePrice: mockInput.basePrice,
            expirationPeriod: mockInput.expirationPeriod,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
          }
        });
        expect(result).toEqual(mockResponse);
      });

      it('validates required fields are provided', async () => {
        const invalidInput = {
          name: 'Test Item'
        } as CreateItemInput;

        await expect(createItem(invalidInput))
          .rejects.toThrow();
      });

      it('handles creation error', async () => {
        (prisma.item.create as jest.Mock).mockRejectedValue(
          new Error('Database error')
        );

        await expect(createItem(mockInput))
          .rejects.toThrow('Database error');
      });
    });

    describe('deleteItem', () => {
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

      it('updates item with provided fields', async () => {
        const input = {
          id: '1',
          name: 'Updated Item',
          expirationPeriod: 90
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
            basePrice: undefined,
            expirationPeriod: input.expirationPeriod,
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
  });

  describe('Location Operations', () => {
    describe('createLocation', () => {
      const mockInput = {
        address1: '123 Main St',
        city: 'TestCity',
        stateOrProvince: 'TestState',
        country: 'TestCountry'
      };

      it('creates location successfully without address2', async () => {
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

      it('creates location successfully with address2', async () => {
        const mockResponse = {
          id: '1',
          ...mockInput,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        (prisma.location.create as jest.Mock).mockResolvedValue(mockResponse);

        const result = await createLocation({
          ...mockInput,
          address2: 'Unit 123'
        });

        expect(prisma.location.create).toHaveBeenCalledWith({
          data: {
            ...mockInput,
            address2: 'Unit 123',
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

    describe('updateLocation', () => {
      it('updates location with partial data', async () => {
        const input = {
          id: '1'
        };

        await updateLocation(input);

        (prisma.location.create as jest.Mock).mockResolvedValue(null);

        expect(prisma.location.update).toHaveBeenCalledWith({
          where: { id: '1' },
          data: {
            city: undefined,
            address1: undefined,
            address2: undefined,
            stateOrProvince: undefined,
            country: undefined,
            updatedAt: expect.any(Date)
          }
        });
      });

      it('updates location with full data', async () => {
        const input = {
          id: '1',
          city: 'NewCity',
          address1: '123 Main St',
          address2: 'Unit 456',
          stateOrProvince: 'CA',
          country: 'USA'
        };

        await updateLocation(input);

        (prisma.location.create as jest.Mock).mockResolvedValue(null);

        expect(prisma.location.update).toHaveBeenCalledWith({
          where: { id: '1' },
          data: {
            city: 'NewCity',
            address1: '123 Main St',
            address2: 'Unit 456',
            stateOrProvince: 'CA',
            country: 'USA',
            updatedAt: expect.any(Date)
          }
        });
      });
    });

    describe('deleteLocation', () => {
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

    describe('getLocationsByItem', () => {
      const mockLocations = [
        {
          id: 'loc1',
          address1: '123 Main St',
          city: 'TestCity',
          stateOrProvince: 'TestState',
          country: 'TestCountry',
          machineLocations: [
            {
              id: 'ml1',
              machine: {
                id: 'm1',
                name: 'Machine 1',
                machineItems: [
                  {
                    id: 'mi1',
                    item: {
                      id: 'item1',
                      name: 'Test Item'
                    }
                  }
                ]
              }
            }
          ]
        }
      ];

      it('returns locations containing specified item', async () => {
        (prisma.location.findMany as jest.Mock).mockResolvedValue(mockLocations);

        const result = await getLocationsByItem('item1');

        expect(prisma.location.findMany).toHaveBeenCalledWith({
          where: {
            machineLocations: {
              some: {
                machine: {
                  machineItems: {
                    some: {
                      itemId: 'item1'
                    }
                  }
                }
              }
            }
          },
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
        expect(result).toEqual(mockLocations);
      });

      it('returns empty array when no matching locations found', async () => {
        (prisma.location.findMany as jest.Mock).mockResolvedValue([]);

        const result = await getLocationsByItem('nonexistent');

        expect(result).toEqual([]);
      });

      it('handles database query error', async () => {
        (prisma.location.findMany as jest.Mock).mockRejectedValue(
          new Error('Database query failed')
        );

        await expect(getLocationsByItem('item1'))
          .rejects.toThrow('Database query failed');
      });

      it('verifies deep nested data structure', async () => {
        (prisma.location.findMany as jest.Mock).mockResolvedValue(mockLocations);

        const result = await getLocationsByItem('item1');

        // Verify nested structure is complete
        const location = result[0];
        const machineLocation = location.machineLocations[0];
        const machine = machineLocation.machine;
        const machineItem = machine.machineItems[0];
        const item = machineItem.item;

        expect(item).toBeDefined();
        expect(item.id).toBe('item1');
        expect(item.name).toBe('Test Item');
      });
    });

    describe('getLocationsByMachineName', () => {
      const machineName = 'Test Machine';
      const mockLocations = [{
        id: '1',
        address1: '123 Main St',
        machineLocations: [{
          machine: { id: '1', name: 'Test Machine' }
        }]
      }];

      it('returns locations with matching machine name', async () => {
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

      it('returns empty array when no matches found', async () => {
        (prisma.location.findMany as jest.Mock).mockResolvedValue([]);
        const result = await getLocationsByMachineName('NonexistentMachine');
        expect(result).toEqual([]);
      });

      it('handles database errors', async () => {
        const error = new Error('Database connection failed');
        (prisma.location.findMany as jest.Mock).mockRejectedValue(error);
        await expect(getLocationsByMachineName(machineName)).rejects.toThrow('Database connection failed');
      });

      it('handles invalid input', async () => {
        const error = new Error('Invalid input');
        (prisma.location.findMany as jest.Mock).mockRejectedValue(error);
        await expect(getLocationsByMachineName('')).rejects.toThrow('Invalid input');
      });
    });
  });

  describe('Machine Operations', () => {
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
  });

  describe('MachineLocation Operations', () => {
    describe('createMachineLocation', () => {
      const mockInput = {
        name: 'Test Location',
        machineId: 'm1',
        locationId: 'l1'
      };

      it('creates machine location relationship', async () => {
        const mockResponse = {
          id: 'ml1',
          ...mockInput,
          createdAt: new Date(),
          updatedAt: new Date(),
          machine: { id: 'm1', name: 'Machine 1' },
          location: { id: 'l1', address1: '123 Main St' }
        };

        (prisma.machineLocation.create as jest.Mock).mockResolvedValue(mockResponse);

        const result = await createMachineLocation(mockInput);

        expect(prisma.machineLocation.create).toHaveBeenCalledWith({
          data: {
            name: mockInput.name,
            machineId: mockInput.machineId,
            locationId: mockInput.locationId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
          },
          include: {
            machine: true,
            location: true
          }
        });
        expect(result).toEqual(mockResponse);
      });

      it('handles foreign key constraint errors', async () => {
        (prisma.machineLocation.create as jest.Mock).mockRejectedValue(
          new Error('Foreign key constraint failed')
        );

        await expect(createMachineLocation(mockInput))
          .rejects.toThrow('Foreign key constraint failed');
      });
    });

    describe('updateMachineLocation', () => {
      const mockExisting = {
        id: 'ml1',
        name: 'Old Name',
        machine: { id: 'm1' },
        location: { id: 'l1' }
      };

      it('updates only provided fields', async () => {
        const input = {
          id: 'ml1',
          name: 'New Name'
        };

        const mockResponse = {
          ...mockExisting,
          name: input.name,
          updatedAt: new Date()
        };

        (prisma.machineLocation.update as jest.Mock).mockResolvedValue(mockResponse);

        const result = await updateMachineLocation(input);

        expect(prisma.machineLocation.update).toHaveBeenCalledWith({
          where: { id: input.id },
          data: {
            name: input.name,
            updatedAt: expect.any(Date)
          },
          include: {
            machine: true,
            location: true
          }
        });
        expect(result).toEqual(mockResponse);
      });

      it('handles machine and location relationship updates', async () => {
        const input = {
          id: 'ml1',
          machineId: 'm2',
          locationId: 'l2'
        };

        await updateMachineLocation(input);

        expect(prisma.machineLocation.update).toHaveBeenCalledWith({
          where: { id: input.id },
          data: {
            machine: { connect: { id: input.machineId } },
            location: { connect: { id: input.locationId } },
            updatedAt: expect.any(Date)
          },
          include: {
            machine: true,
            location: true
          }
        });
      });

      it('handles non-existent record error', async () => {
        (prisma.machineLocation.update as jest.Mock).mockRejectedValue(
          new Error('Record not found')
        );

        await expect(updateMachineLocation({ id: 'invalid' }))
          .rejects.toThrow('Record not found');
      });
    });

    describe('deleteMachineLocation', () => {
      it('deletes machine location relationship', async () => {
        (prisma.machineLocation.delete as jest.Mock).mockResolvedValue(true);

        const result = await deleteMachineLocation('ml1');

        expect(prisma.machineLocation.delete).toHaveBeenCalledWith({
          where: { id: 'ml1' }
        });
        expect(result).toBe(true);
      });

      it('handles deletion error', async () => {
        (prisma.machineLocation.delete as jest.Mock).mockRejectedValue(
          new Error('Record not found')
        );

        await expect(deleteMachineLocation('invalid'))
          .rejects.toThrow('Record not found');
      });
    });

    describe('getMachinesByLocation', () => {
      it('returns machines at specified location', async () => {
        const mockMachines = [{
          id: 'm1',
          name: 'Machine 1',
          machineItems: [{
            id: 'mi1',
            item: { id: 'i1', name: 'Item 1' }
          }],
          machineLocations: [{
            id: 'ml1',
            location: { id: 'l1', address1: '123 Main St' }
          }],
          manufacturer: { id: 'mfr1', name: 'Manufacturer 1' },
          machineType: { id: 'mt1', name: 'Type 1' }
        }];

        (prisma.machine.findMany as jest.Mock).mockResolvedValue(mockMachines);

        const result = await getMachinesByLocation('l1');

        expect(prisma.machine.findMany).toHaveBeenCalledWith({
          where: {
            machineLocations: {
              some: {
                locationId: 'l1'
              }
            }
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
        expect(result).toEqual(mockMachines);
      });

      it('handles query error', async () => {
        (prisma.machine.findMany as jest.Mock).mockRejectedValue(
          new Error('Database error')
        );

        await expect(getMachinesByLocation('l1'))
          .rejects.toThrow('Database error');
      });
    });

    describe('getMachineLocations', () => {
      it('retrieves all machine locations with relationships', async () => {
        const mockLocations = [
          {
            id: 'ml1',
            name: 'Test Location',
            machine: { id: 'm1', name: 'Machine 1' },
            location: { id: 'l1', address1: '123 Main St' }
          }
        ];

        (prisma.machineLocation.findMany as jest.Mock).mockResolvedValue(mockLocations);

        const result = await getMachineLocations();

        expect(prisma.machineLocation.findMany).toHaveBeenCalledWith({
          include: {
            machine: true,
            location: true
          }
        });
        expect(result).toEqual(mockLocations);
      });

      it('handles query error', async () => {
        (prisma.machineLocation.findMany as jest.Mock).mockRejectedValue(
          new Error('Database error')
        );

        await expect(getMachineLocations())
          .rejects.toThrow('Database error');
      });

      it('returns empty array when no records exist', async () => {
        (prisma.machineLocation.findMany as jest.Mock).mockResolvedValue([]);

        const result = await getMachineLocations();
        expect(result).toEqual([]);
      });
    });
  });

  describe('MachineManufacturer Operations', () => {
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

  describe('MachineItem Operations', () => {
    describe('createMachineItem', () => {
      const mockInput = {
        machineId: 'm1',
        itemId: 'i1',
        name: 'Custom Name',
        quantity: 5
      };

      it('creates machine item with all fields', async () => {
        const mockResponse = {
          id: 'mi1',
          ...mockInput,
          machine: { id: 'm1', name: 'Machine 1' },
          item: { id: 'i1', name: 'Item 1' }
        };

        (prisma.machineItem.create as jest.Mock).mockResolvedValue(mockResponse);

        const result = await createMachineItem(mockInput);

        expect(prisma.machineItem.create).toHaveBeenCalledWith({
          data: {
            machineId: mockInput.machineId,
            itemId: mockInput.itemId,
            name: mockInput.name,
            quantity: mockInput.quantity
          },
          include: {
            machine: true,
            item: true
          }
        });
        expect(result).toEqual(mockResponse);
      });

      it('creates machine item without optional name', async () => {
        const inputWithoutName = {
          machineId: 'm1',
          itemId: 'i1',
          quantity: 5
        };

        const mockResponse = {
          id: 'mi1',
          ...inputWithoutName,
          name: null,
          machine: { id: 'm1', name: 'Machine 1' },
          item: { id: 'i1', name: 'Item 1' }
        };

        (prisma.machineItem.create as jest.Mock).mockResolvedValue(mockResponse);

        const result = await createMachineItem(inputWithoutName);

        expect(prisma.machineItem.create).toHaveBeenCalledWith({
          data: {
            machineId: inputWithoutName.machineId,
            itemId: inputWithoutName.itemId,
            name: null,
            quantity: inputWithoutName.quantity
          },
          include: {
            machine: true,
            item: true
          }
        });
        expect(result.name).toBeNull();
      });

      it('handles foreign key constraint error', async () => {
        (prisma.machineItem.create as jest.Mock).mockRejectedValue(
          new Error('Foreign key constraint failed')
        );

        await expect(createMachineItem(mockInput))
          .rejects.toThrow('Foreign key constraint failed');
      });

      it('handles duplicate record error', async () => {
        (prisma.machineItem.create as jest.Mock).mockRejectedValue(
          new Error('Unique constraint failed')
        );

        await expect(createMachineItem(mockInput))
          .rejects.toThrow('Unique constraint failed');
      });
    });

    describe('deleteMachineItem', () => {
      it('deletes machine item successfully', async () => {
        (prisma.machineItem.deleteMany as jest.Mock).mockResolvedValue({ count: 1 });

        const result = await deleteMachineItem('mi1');

        expect(prisma.machineItem.deleteMany).toHaveBeenCalledWith({
          where: { id: 'mi1' }
        });
        expect(result).toBe(true);
      });

      it('returns true even if no items deleted', async () => {
        (prisma.machineItem.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });

        const result = await deleteMachineItem('nonexistent');
        expect(result).toBe(true);
      });

      it('handles deletion error', async () => {
        (prisma.machineItem.deleteMany as jest.Mock).mockRejectedValue(new Error('Database error'));

        await expect(deleteMachineItem('mi1')).rejects.toThrow('Database error');
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

  describe('MachineType Operations', () => {
    describe('createMachineType', () => {
      const mockInput = {
        name: 'AP 123'
      };

      it('creates machine type successfully', async () => {
        const mockResponse = {
          id: 'mt1',
          ...mockInput,
          createdAt: new Date(),
          updatedAt: new Date(),
          machines: []
        };

        (prisma.machineType.create as jest.Mock).mockResolvedValue(mockResponse);

        const result = await createMachineType(mockInput);

        expect(prisma.machineType.create).toHaveBeenCalledWith({
          data: {
            name: mockInput.name,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
          },
          include: {
            machines: true
          }
        });
        expect(result).toEqual(mockResponse);
      });

      it('handles creation error', async () => {
        (prisma.machineType.create as jest.Mock).mockRejectedValue(
          new Error('Database error')
        );

        await expect(createMachineType(mockInput))
          .rejects.toThrow('Database error');
      });
    });

    describe('deleteMachineType', () => {
      it('deletes unused machine type', async () => {
        (prisma.machine.count as jest.Mock).mockResolvedValue(0);
        (prisma.machineType.delete as jest.Mock).mockResolvedValue(true);

        const result = await deleteMachineType('mt1');

        expect(prisma.machine.count).toHaveBeenCalledWith({
          where: { machineTypeId: 'mt1' }
        });
        expect(prisma.machineType.delete).toHaveBeenCalledWith({
          where: { id: 'mt1' }
        });
        expect(result).toBe(true);
      });

      it('prevents deletion when type is in use', async () => {
        (prisma.machine.count as jest.Mock).mockResolvedValue(1);

        await expect(deleteMachineType('mt1'))
          .rejects
          .toThrow('Cannot delete machine type that is in use by machines');

        expect(prisma.machineType.delete).not.toHaveBeenCalled();
      });

      it('handles deletion error', async () => {
        (prisma.machine.count as jest.Mock).mockResolvedValue(0);
        (prisma.machineType.delete as jest.Mock).mockRejectedValue(
          new Error('Database error')
        );

        await expect(deleteMachineType('mt1'))
          .rejects.toThrow('Database error');
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

    describe('updateMachineType', () => {
      const mockExisting = {
        id: 'mt1',
        name: 'Old Type',
        machines: []
      };

      it('updates machine type fields', async () => {
        const input = {
          id: 'mt1',
          name: 'Updated Type'
        };

        const mockResponse = {
          ...mockExisting,
          name: input.name,
          updatedAt: new Date()
        };

        (prisma.machineType.update as jest.Mock).mockResolvedValue(mockResponse);

        const result = await updateMachineType(input);

        expect(prisma.machineType.update).toHaveBeenCalledWith({
          where: { id: input.id },
          data: {
            name: input.name,
            updatedAt: expect.any(Date)
          },
          include: {
            machines: true
          }
        });
        expect(result).toEqual(mockResponse);
      });

      it('handles non-existent type', async () => {
        (prisma.machineType.update as jest.Mock).mockRejectedValue(
          new Error('Record not found')
        );

        await expect(updateMachineType({ id: 'invalid' }))
          .rejects.toThrow('Record not found');
      });
    });
  });
});
