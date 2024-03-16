export function CategoryTree(categories, categoryId) {
    for (const category of categories) {
      if (category.url === categoryId) {
        return [category]; // Base case: the category is the root of the tree
      }
      if (category.subcategories) {
        const parentCategories = CategoryTree(category.subcategories, categoryId);
        if (parentCategories !== null) {
          return [category, ...parentCategories];
        }
      }
    }
    return null; // The category ID was not found in the tree
  }