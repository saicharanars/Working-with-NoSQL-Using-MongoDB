const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    type: {
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    required: true,
  },
});
userSchema.methods.addToCart = function(product)  {
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
  if (cartProductIndex >= 0) {
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
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = { items: updatedCartItems };
  console.log(updatedCart, this);

  this.cart = updatedCart;
  return this.save();
};
userSchema.methods.removeFromCart=function(productId){
    const updatedCartitems = this.cart.items.filter((item) => {
        return item.productId.toString() !== productId.toString();
      });
    this.cart.items=updatedCartitems;
    return this.save()  
}

module.exports = mongoose.model("User", userSchema);
