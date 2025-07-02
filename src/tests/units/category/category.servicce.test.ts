import { createCategory } from '@src/modules/category/v1/category.service';

describe('Category Service', () => {
  it('should create a category successfully', async () => {
    const categoryInput = {
      name: 'Test Category',
      icon: 'test-icon',
      color: '#FF5733',
    };
    const category = await createCategory(categoryInput);
    expect(category).toHaveProperty('_id');
    expect(category.name).toBe(categoryInput.name);
    expect(category.icon).toBe(categoryInput.icon);
    expect(category.color).toBe(categoryInput.color);
  });

  it('should fail if the name is less than 3 characters', async () => {
    const invalidCategoryInput = {
      name: 'ab',
      icon: 'test-icon',
      color: '#fff',
    };
    await expect(createCategory(invalidCategoryInput)).rejects.toThrow();
  });

  it('should fail if the name is more than 60 characters', async () => {
    const invalidCategoryInput = {
      name: 'a'.repeat(61),
      icon: 'test-icon',
      color: '#fff',
    };
    await expect(createCategory(invalidCategoryInput)).rejects.toThrow();
  });

  it('should fail if the name is missing', async () => {
    const invalidCategoryInput = {
      icon: 'test-icon',
      color: '#fff',
    } as never;
    await expect(createCategory(invalidCategoryInput)).rejects.toThrow();
  });
});
