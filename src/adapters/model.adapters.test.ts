import {
  adaptLocation,
  adaptMachineLocation,
  adaptMachine,
  adaptMachineType,
  adaptItemWithStringTimestamps,
  adaptMachineItem,
  adaptTimeStamps
} from './model.adapters';

describe('Adapters', () => {
  const mockDate = new Date('2024-01-01');

  describe('adaptLocation', () => {
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
        name: 'Test Location',
        machineId: 'mach1',
        locationId: 'loc1',
        createdAt: mockDate,
        updatedAt: mockDate,
        machine: {
          id: 'mach1',
          name: 'Test Machine',
          machineTypeId: 'mt1',
          manufacturerId: 'mfr1',
          createdAt: mockDate,
          updatedAt: mockDate
        }
      }]
    };

    it('adapts location with all fields', () => {
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
          name: 'Test Location',
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
  });

  describe('adaptMachineType', () => {
    const mockPrismaMachineType = {
      id: 'mt1',
      name: 'Type 1',
      manufacturerId: 'mfr1',
      createdAt: mockDate,
      updatedAt: mockDate,
      manufacturer: {
        id: 'mfr1',
        name: 'Manufacturer 1',
        createdAt: mockDate,
        updatedAt: mockDate
      },
      machines: [{
        id: 'mach1',
        name: 'Machine 1',
        machineTypeId: 'mt1',
        manufacturerId: 'mfr1',
        createdAt: mockDate,
        updatedAt: mockDate
      }]
    };

    it('adapts machine type with relationships', () => {
      const result = adaptMachineType(mockPrismaMachineType);
      expect(result).toEqual({
        id: 'mt1',
        name: 'Type 1',
        manufacturerId: 'mfr1',
        createdAt: mockDate.toISOString(),
        updatedAt: mockDate.toISOString(),
        manufacturer: {
          id: 'mfr1',
          name: 'Manufacturer 1',
          createdAt: mockDate.toISOString(),
          updatedAt: mockDate.toISOString()
        },
        machines: [{
          id: 'mach1',
          name: 'Machine 1',
          createdAt: mockDate.toISOString(),
          updatedAt: mockDate.toISOString()
        }]
      });
    });
  });

  describe('adaptMachine', () => {
    const mockPrismaMachine = {
      id: 'mach1',
      name: 'Machine 1',
      manufacturerId: 'mfr1',
      machineTypeId: 'mt1',
      createdAt: mockDate,
      updatedAt: mockDate,
      machineType: {
        id: 'mt1',
        name: 'Type 1',
        machines: [{
          id: 'mach1',
          name: 'Machine 1',
          manufacturerId: 'mfr1',
          machineTypeId: 'mt1',
          createdAt: mockDate,
          updatedAt: mockDate
        }],
        manufacturerId: 'mfr1',
        manufacturer: {
          id: 'mfr1',
          name: 'Manufacturer 1',
          createdAt: mockDate,
          updatedAt: mockDate
        },
        createdAt: mockDate,
        updatedAt: mockDate
      },
      manufacturer: {
        id: 'mfr1',
        name: 'Manufacturer 1',
        createdAt: mockDate,
        updatedAt: mockDate
      },
      machineItems: [{
        id: 'mi1',
        name: 'Item 1',
        quantity: 5,
        machineId: 'mach1',
        itemId: 'item1',
        item: {
          id: 'item1',
          name: 'Test Item',
          basePrice: 1.99,
          expirationPeriod: 30,
          createdAt: mockDate,
          updatedAt: mockDate
        }
      }],
      machineLocations: [{
        id: 'ml1',
        name: 'Location 1',
        locationId: 'loc1',
        machineId: 'mach1',
        createdAt: mockDate,
        updatedAt: mockDate,
        location: {
          id: 'loc1',
          address1: '123 Main St',
          address2: 'Apt 456',
          city: 'Test City',
          stateOrProvince: 'Test State',
          country: 'Test Country',
          createdAt: mockDate,
          updatedAt: mockDate
        }
      }]
    };

    it('adapts machine with all relationships', () => {
      const result = adaptMachine(mockPrismaMachine);
      expect(result.id).toBe('mach1');
      expect(result.name).toBe('Machine 1');
      expect(result.machineType).toBeDefined();
      expect(result.manufacturer).toBeDefined();
      expect(result.machineItems).toHaveLength(1);
      expect(result.machineLocations).toHaveLength(1);
      expect(result.createdAt).toBe(mockDate.toISOString());
    });
  });

  describe('adaptTimeStamps', () => {
    it('converts string timestamps to dates', () => {
      const input = {
        id: '1',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      };
      const result = adaptTimeStamps(input);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('keeps date timestamps as dates', () => {
      const input = {
        id: '1',
        createdAt: mockDate,
        updatedAt: mockDate
      };
      const result = adaptTimeStamps(input);
      expect(result.createdAt).toBe(mockDate);
      expect(result.updatedAt).toBe(mockDate);
    });
  });
});