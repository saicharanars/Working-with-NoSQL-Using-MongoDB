const getdb = require("../util/database").getdb;
const mongodb = require("mongodb");
const Product = require("./product");
const ObjectId = mongodb.ObjectId;

class User {
  constructor(name, email, cart, id) {
    this.id = new mongodb.ObjectId(id);
    this.name = name;
    this.email = email;
    this.cart = cart;
    //this._id = _id;
  }
  save() {
    const db = getdb();
    return db.collection("users").insertOne(this);
  }
  addToCart(product) {
    console.log(product);
    console.log(this.cart.items, "prod>>>>>");

    const cartProductIndex = this.cart.items.findIndex((cp) => {
      console.log(cp.productId == product._id);
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    //spreading the cart items
    console.log(cartProductIndex, "grth>>>>>");
    if (cartProductIndex) {
      console.log("dbhdufgh", updatedCartItems[cartProductIndex].quantity);
      newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
      console.log(
        newQuantity,
        "ghbfkth>>>>>>>",
        updatedCartItems[cartProductIndex].quantity
      );
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = { items: updatedCartItems };
    console.log(updatedCart, this);

    const db = getdb();
    return db
      .collection("users")
      .updateOne(
        { _id: this.id },
        { $set: { cart: updatedCart } },
        { upsert: false }
      )
      .then((item) => {
        console.log("updated iten", item);
      })
      .catch((error) => console.log(error));
  }
  getCart() {
    const db = getdb();
    const products = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: products } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }
  deleteCart(productId) {
    console.log(this.cart.items,"delete")
    const updatedCartitems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });
    console.log(updatedCartitems,"delete",this)
    const db = getdb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this.id) },
        { $set: { cart: { items: updatedCartitems } } }
      );
  }
  static findById(userId) {
    const db = getdb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
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
