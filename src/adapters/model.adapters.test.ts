import {
  adaptLocation,
  adaptMachineLocation,
  adaptMachineType,
  adaptMachine,
  adaptItemWithStringTimestamps,
  adaptMachineItem, PrismaItemWithRelations
} from './model.adapters';
import { WithTimeStamps } from '../util/typeguards';

describe('Adapters', () => {
  const mockDate = new Date('2024-01-01');

  describe('adaptLocation', () => {
    const mockDate = new Date('2024-01-01');

    const mockPrismaLocation = {
      id: 'loc1',
      address1: '123 Main St',
      address2: 'Suite 100',
      city: 'Test City',
      stateOrProvince: 'Test State',
      country: 'Test Country',
      createdAt: mockDate,
      updatedAt: mockDate,
      machineLocations: [{
        id: 'ml1',
        name: 'Front Entrance',
        machineId: 'mach1',
        locationId: 'loc1',
        createdAt: mockDate,
        updatedAt: mockDate,
        machine: {
          id: 'mach1',
          name: 'Test Machine',
          createdAt: mockDate,
          updatedAt: mockDate,
          manufacturerId: 'mfr1',
          machineTypeId: 'mt1'
        }
      }]
    };

    it('adapts location with full relations', () => {
      const result = adaptLocation(mockPrismaLocation);

      expect(result).toEqual({
        id: 'loc1',
        address1: '123 Main St',
        address2: 'Suite 100',
        city: 'Test City',
        stateOrProvince: 'Test State',
        country: 'Test Country',
        createdAt: mockDate.toISOString(),
        updatedAt: mockDate.toISOString(),
        machineLocations: [{
          id: 'ml1',
          name: 'Front Entrance',
          machineId: 'mach1',
          locationId: 'loc1',
          createdAt: mockDate.toISOString(),
          updatedAt: mockDate.toISOString(),
          machine: {
            id: 'mach1',
            name: 'Test Machine',
            createdAt: mockDate.toISOString(),
            updatedAt: mockDate.toISOString()
          }
        }]
      });
    });

    it('handles null address2', () => {
      const locationWithoutAddress2 = {
        ...mockPrismaLocation,
        address2: null
      };

      const result = adaptLocation(locationWithoutAddress2);
      expect(result.address2).toBeNull();
    });

    it('handles empty machineLocations', () => {
      const locationWithoutMachines = {
        ...mockPrismaLocation,
        machineLocations: []
      };

      const result = adaptLocation(locationWithoutMachines);
      expect(result.machineLocations).toEqual([]);
    });
  });

  describe('adaptMachineType', () => {
    const mockPrismaMachineType = {
      id: 'mt1',
      name: 'Test Type',
      manufacturerId: 'mfr1',
      createdAt: mockDate,
      updatedAt: mockDate,
      machines: [{
        id: 'mach1',
        name: 'Machine 1',
        createdAt: mockDate,
        updatedAt: mockDate,
        manufacturerId: 'mfr1',
        machineTypeId: 'mt1'
      }],
      manufacturer: {
        id: 'mfr1',
        name: 'Test Manufacturer',
        createdAt: mockDate,
        updatedAt: mockDate
      }
    };

    it('adapts machine type with full relations', () => {
      const result = adaptMachineType(mockPrismaMachineType);

      expect(result).toEqual({
        id: 'mt1',
        name: 'Test Type',
        manufacturerId: 'mfr1',
        manufacturer: {
          id: 'mfr1',
          name: 'Test Manufacturer',
          createdAt: mockDate.toISOString(),
          updatedAt: mockDate.toISOString()
        },
        machines: [{
          id: 'mach1',
          name: 'Machine 1',
          createdAt: mockDate.toISOString(),
          updatedAt: mockDate.toISOString()
        }],
        createdAt: mockDate.toISOString(),
        updatedAt: mockDate.toISOString()
      });
    });
  });

  describe('adaptMachineItem', () => {
    const mockPrismaMachineItem = {
      id: 'mi1',
      name: 'Test Machine Item',
      quantity: 5,
      machineId: 'mach1',
      itemId: 'item1',
      machine: {
        id: 'mach1',
        name: 'Test Machine',
        createdAt: mockDate,
        updatedAt: mockDate,
        manufacturerId: 'mfr1',
        machineTypeId: 'mt1'
      },
      item: {
        id: 'item1',
        name: 'Test Item',
        basePrice: 1.99,
        expirationPeriod: 30,
        createdAt: mockDate,
        updatedAt: mockDate
      }
    };

    it('adapts machine item with full relations', () => {
      const result = adaptMachineItem(mockPrismaMachineItem);

      expect(result).toEqual({
        id: 'mi1',
        name: 'Test Machine Item',
        quantity: 5,
        machineId: 'mach1',
        itemId: 'item1',
        machine: {
          id: 'mach1',
          name: 'Test Machine',
          createdAt: mockDate.toISOString(),
          updatedAt: mockDate.toISOString()
        },
        item: {
          id: 'item1',
          name: 'Test Item',
          basePrice: 1.99,
          expirationPeriod: 30,
          createdAt: mockDate.toISOString(),
          updatedAt: mockDate.toISOString()
        }
      });
    });

    it('provides default values for optional fields', () => {
      const minimalItem = {
        ...mockPrismaMachineItem,
        name: null,
        item: {
          ...mockPrismaMachineItem.item,
          basePrice: 2,
          expirationPeriod: 90
        }
      };

      const result = adaptMachineItem(minimalItem);

      expect(result.name).toBeNull();
      expect(result.item!.basePrice).toBe(2);
      expect(result.item!.expirationPeriod).toBe(90);
    });
  });

  describe('adaptItemWithStringTimestamps', () => {
    const mockPrismaItem = {
      id: 'item1',
      name: 'Test Item',
      basePrice: 1.99,
      expirationPeriod: 30,
      createdAt: mockDate,
      updatedAt: mockDate,
      machineItems: [{
        id: 'mi1',
        name: 'Test Machine Item',
        quantity: 5,
        machineId: 'mach1',
        itemId: 'item1',
        machine: {
          id: 'mach1',
          name: 'Test Machine',
          createdAt: mockDate,
          updatedAt: mockDate
        }
      }]
    };

    it('adapts item with full relations', () => {
      const result = adaptItemWithStringTimestamps(mockPrismaItem as PrismaItemWithRelations);

      expect(result).toEqual({
        id: 'item1',
        name: 'Test Item',
        basePrice: 1.99,
        expirationPeriod: 30,
        createdAt: mockDate.toISOString(),
        updatedAt: mockDate.toISOString(),
        machineItems: [{
          id: 'mi1',
          name: 'Test Machine Item',
          quantity: 5,
          machineId: 'mach1',
          itemId: 'item1',
          machine: {
            id: 'mach1',
            name: 'Test Machine',
            createdAt: mockDate.toISOString(),
            updatedAt: mockDate.toISOString()
          }
        }]
      });
    });
  });
});