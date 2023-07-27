const getdb = require("../util/database").getdb;
const mongodb = require("mongodb");
class Product {
  constructor(title, price, description, imageUrl, id,userid) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id?new mongodb.ObjectId(id):null;
    this.userid=userid;
  }
  save() {
    const db = getdb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }

    return dbOp
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  static fetchAll() {
    const db = getdb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => console.log(err));
  }
  static findById(prodId) {
    const db = getdb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => console.log(err));
  }
  static DeleteById(prodId) {
    const db = getdb();
    db.collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
