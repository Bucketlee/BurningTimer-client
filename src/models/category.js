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

  static getCategoryId(categoryName, categories) {
    const targetCategory = categories.find(Category => Category.name === categoryName);
    return targetCategory.CategoryId;
  }
}

export default Category;
