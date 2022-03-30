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

  static getLabelByName(labelName, categories) {
    const targetLabel = categories.find(label => label.name === labelName);
    return targetLabel;
  }

  static getLabelById(labelId, categories) {
    const targetLabel = categories.find(label => label._id === labelId);
    return targetLabel;
  }

  static getLabelsWithCategoryId(labels, categoryId) {
    const labelsWithCategoryId = [];
    for (let i = 0; i < labels.length; i += 1) {
      if (labels[i].categoryId === categoryId) labelsWithCategoryId.push(labels[i]);
    }
    return labelsWithCategoryId;
  }

  static getActiveLabels(labels) {
    const activedLabels = [];
    for (let i = 0; i < labels.length; i += 1) {
      if (labels[i].priority !== 0) activedLabels.push(labels[i]);
    }
    return activedLabels;
  }

  static sortLabelsByPriority(labels) {
    labels.sort((a, b) => a.priority - b.priority);
    return labels;
  }

  static findLabelWithTargetName(labels, name) {
    for (let i = 0; i < labels.length; i += 1) {
      if (labels[i].name === name) {
        return labels[i];
      }
    }
  }
}

export default Label;
