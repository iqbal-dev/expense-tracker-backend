import Category from '@src/modules/category/v1/category.model';

describe('Category Model', () => {
  it('create & save category successfully', async () => {
    const category = {
      name: 'Example Category',
      icon: 'example-icon',
      color: '#FF5733',
    };
    const newCategory = new Category(category);
    const savedCategory = await newCategory.save();
    expect(savedCategory._id).toBeDefined();
    expect(savedCategory.name).toBe(category.name);
    expect(savedCategory.icon).toBe(category.icon);
    expect(savedCategory.color).toBe(category.color);
  });
  it('should fail if the required field is missing', async () => {
    const category = {
      icon: 'example-icon',
      color: '#FF5733',
    };

    const newCategory = new Category(category);

    await expect(newCategory.save()).rejects.toThrow(
      'Category validation failed: name: Name is required',
    );
  });
  it('should fail if validation fails', async () => {
    const category = {
      name: 'Ex',
      icon: 'ex-icon',
      color: 'invalid-color',
    };

    const newCategory = new Category(category);

    await expect(newCategory.save()).rejects.toThrow(
      'Category validation failed: name: Name must be at least 2 characters',
    );
  });
  it('should update category successfully', async () => {
    const newCategoryInput = {
      name: 'create-category',
      icon: 'create-icon',
      color: '#FF5733',
    };

    const newCategory = await Category.create(newCategoryInput);
    const updateCategoryInput = {
      name: 'update-category',
      icon: 'update-icon',
      color: '#Fd5779',
    };
    const updateCategory = await Category.findById({ _id: newCategory._id });

    if (!updateCategory) {
      expect(updateCategory).toBeInstanceOf(Error);
      return;
    }

    updateCategory.name = updateCategoryInput.name;
    updateCategory.icon = updateCategoryInput.icon;
    updateCategory.color = updateCategoryInput.color;

    expect(updateCategory).toBeDefined();
    expect(updateCategory.name).toBe(updateCategoryInput.name);
    expect(updateCategory.icon).toBe(updateCategoryInput.icon);
    expect(updateCategory.color).toBe(updateCategoryInput.color);
  });
  it('should delete category successfully', async () => {
    const newCategoryInput = {
      name: 'delete-category',
      icon: 'delete-icon',
      color: '#FF5733',
    };

    const newCategory = await Category.create(newCategoryInput);
    const deletedCategory = await Category.findByIdAndDelete(newCategory._id);

    expect(deletedCategory).toBeDefined();
    expect(deletedCategory?._id).toEqual(newCategory._id);
  });
});
