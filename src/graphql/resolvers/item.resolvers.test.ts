import { jest } from '@jest/globals';
import { itemResolvers } from './item.resolvers';
import { createItem, deleteItem, getItems, updateItem } from '../../dal/machine.dal';
import { adaptItemWithStringTimestamps } from '../../adapters/model.adapters';
import { Prisma } from '@prisma/client';

jest.mock('../../dal/machine.dal');
jest.mock('../../adapters/model.adapters');

type GetItemsReturnType = Prisma.PromiseReturnType<typeof getItems>[number]
describe('Item Resolvers', () => {
  const mockContext = {};
  const mockDate = new Date('2024-01-01');

  const mockItem = {
    id: '1',
    name: 'Test Item',
    basePrice: 1.99,
    expirationPeriod: 30,
    createdAt: mockDate,
    updatedAt: mockDate
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query.getItems', () => {
    it('returns mapped items array', async () => {
      // @ts-ignore
      (getItems as jest.Mock).mockResolvedValue([mockItem]);

      // @ts-ignore
      const result = await itemResolvers.Query!.getItems({}, {}, mockContext);

      expect(result).toEqual([{
        id: mockItem.id,
        name: mockItem.name,
        basePrice: mockItem.basePrice,
        expirationPeriod: mockItem.expirationPeriod,
        createdAt: mockDate.toISOString(),
        updatedAt: mockDate.toISOString()
      }]);
    });

    it('handles empty results', async () => {
      // @ts-ignore
      (getItems as jest.Mock).mockResolvedValue([]);
      // @ts-ignore
      const result = await itemResolvers.Query!.getItems({}, {}, mockContext);
      expect(result).toEqual([]);
    });

    it('handles errors', async () => {
      // @ts-ignore
      (getItems as jest.Mock).mockRejectedValue(new Error('Query failed'));
      // @ts-ignore
      await expect(itemResolvers.Query!.getItems({}, {}, mockContext))
        .rejects.toThrow('Query failed');
    });
  });

  describe('Mutation.createItem', () => {
    const input = {
      name: 'New Item',
      basePrice: 2.99,
      expirationPeriod: 45
    };

    it('creates item and returns success response', async () => {
      const createdItem = { ...mockItem, ...input };
      // @ts-ignore
      (createItem as jest.Mock).mockResolvedValue(createdItem);
      (adaptItemWithStringTimestamps as jest.Mock).mockReturnValue(createdItem);
      // @ts-ignore
      const result = await itemResolvers.Mutation!.createItem({}, { input }, mockContext);

      expect(result).toEqual({
        code: '200',
        success: true,
        message: `Item created: ${createdItem.id}`,
        item: createdItem
      });
    });

    it('handles creation errors', async () => {
      // @ts-ignore
      (createItem as jest.Mock).mockRejectedValue(new Error('Creation failed'));
      // @ts-ignore
      await expect(itemResolvers.Mutation!.createItem({}, { input }, mockContext))
        .rejects.toThrow('Creation failed');
    });
  });

  describe('Mutation.updateItem', () => {
    const input = {
      id: '1',
      name: 'Updated Item'
    };

    it('updates item and returns success response', async () => {
      const updatedItem = { ...mockItem, name: input.name };
      // @ts-ignore
      (updateItem as jest.Mock).mockResolvedValue(updatedItem);
      (adaptItemWithStringTimestamps as jest.Mock).mockReturnValue(updatedItem);

      // @ts-ignore
      const result = await itemResolvers.Mutation!.updateItem({}, { input }, mockContext);

      expect(result).toEqual({
        code: '200',
        success: true,
        message: `Item updated: ${updatedItem.id}`,
        item: updatedItem
      });
    });

    it('handles update errors', async () => {
      // @ts-ignore
      (updateItem as jest.Mock).mockRejectedValue(new Error('Update failed'));
      // @ts-ignore
      await expect(itemResolvers.Mutation!.updateItem({}, { input }, mockContext))
        .rejects.toThrow('Update failed');
    });
  });

  describe('Mutation.deleteItem', () => {
    it('deletes item and returns success response', async () => {
      // @ts-ignore
      (deleteItem as jest.Mock).mockResolvedValue(true);

      // @ts-ignore
      const result = await itemResolvers.Mutation!.deleteItem({}, { id: '1' }, mockContext);

      expect(result).toEqual({
        code: '200',
        success: true,
        message: 'Item deleted: 1'
      });
    });

    it('handles deletion errors', async () => {
      // @ts-ignore
      (deleteItem as jest.Mock).mockRejectedValue(new Error('Deletion failed'));
      // @ts-ignore
      await expect(itemResolvers.Mutation!.deleteItem({}, { id: '1' }, mockContext))
        .rejects.toThrow('Deletion failed');
    });
  });
});