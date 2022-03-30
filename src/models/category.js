class Category {
  constructor(_id, userId, name, priority, createdAt, updatedAt) {
    this._id = _id;
    this.userId = userId;
    this.name = name;
    this.priority = priority;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json) {
    return new Category(
      json._id,
      json.userId,
      json.name,
      json.priority,
      json.createdAt,
      json.updatedAt,
    );
  }

  static getCategoryByName(categoryName, categories) {
    const targetCategory = categories.find(category => category.name === categoryName);
    return targetCategory;
  }

  static getCategoryById(categoryId, categories) {
    const targetCategory = categories.find(category => category._id === categoryId);
    return targetCategory;
  }


  static getActiveCategories(categories) {
    const activedCategories = [];
    for (let i = 0; i < categories.length; i += 1) {
      if (categories[i].priority !== 0) activedCategories.push(categories[i]);
    }
    return activedCategories;
  }

  static sortCategoriesByPriority(categories) {
    categories.sort((a, b) => a.priority - b.priority);
    return categories;
  }

  static findCategoryWithTargetName(categories, name) {
    for (let i = 0; i < categories.length; i += 1) {
      if (categories[i].name === name) {
        return categories[i];
      }
    }
  }
}

export default Category;
