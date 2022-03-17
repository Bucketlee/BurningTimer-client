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

  static getActiveLabels(labels) {
    const activedLabels = [];
    for (let i = 0; i < labels.length; i += 1) {
      if (labels[i].priority !== 0) activedLabels.push(labels[i]);
    }
    return activedLabels;
  }

  static sortActivedLabelsByPriority(labels) {
    const activedLabels = Label.getActiveLabels(labels);
    activedLabels.sort((a, b) => a.priority - b.priority);
    return activedLabels;
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
