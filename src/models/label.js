class Label {
  constructor(_id, userId, categoryId, name, priority, createdAt, updatedAt) {
    this._id = _id;
    this.userId = userId;
    this.categoryId = categoryId;
    this.name = name;
    this.priority = priority;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json) {
    return new Label(
      json._id,
      json.userId,
      json.categoryId,
      json.name,
      json.priority,
      json.createdAt,
      json.updatedAt,
    );
  }

  static getLabelId(labelName, labels) {
    const targetLabel = labels.find(label => label.name === labelName);
    return targetLabel.labelId;
  }
}

export default Label;
