const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  console.log(Product);
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-detail", {
        product: products[0],
        pageTitle: products[0].title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      console.log(products, "gkjet>>>>>>");
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })

    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId).then((product) => {
    console.log(req.user, "jhfh", product);
    return req.user.addToCart(product);
  });
  //   const prodId = req.body.productId;
  //   let fetchedCart;
  //   let newQuantity = 1;
  //   req.user
  //     .getCart()
  //     .then(cart => {
  //       fetchedCart = cart;
  //       return cart.getProducts({ where: { id: prodId } });
  //     })
  //     .then(products => {
  //       let product;
  //       if (products.length > 0) {
  //         product = products[0];
  //       }

  //       if (product) {
  //         const oldQuantity = product.cartItem.quantity;
  //         newQuantity = oldQuantity + 1;
  //         return product;
  //       }
  //       return Product.findById(prodId);
  //     })
  //     .then(product => {
  //       return fetchedCart.addProduct(product, {
  //         through: { quantity: newQuantity }
  //       });
  //     })
  //     .then(() => {
  //       res.redirect('/cart');
  //     })
  //     .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId,"fege")
  req.user
    .deleteCart(prodId)
    .then((result) => {
      console.log(result,"fkufg")  
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then((result) => {
      console.log(result,"ordered")  
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
    console.log(req.user)
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};
