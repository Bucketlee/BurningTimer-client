class User {
  constructor(_id, username) {
    this._id = _id;
    this.username = username;
  }

  static fromJson(json) {
    return new User(
      json.username,
    );
  }
}

export default User;
