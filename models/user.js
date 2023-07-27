const getdb = require("../util/database").getdb;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class User {
  constructor(name, email, id) {
    this.id = new mongodb.ObjectId(id);
    this.name = name;
    this.email = email;
  }
  save() {
    const db = getdb();
    return db.collection("users").insertOne(this);
  }
  static findById(userId) {
    const db = getdb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {console.log(user);return user})
      .catch((err) => {console.log(err)});
  }
}

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

module.exports = User;
