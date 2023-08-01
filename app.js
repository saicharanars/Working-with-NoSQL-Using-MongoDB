const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("64c7e86aba3c6d52dabe90f8")
    .then((user) => {
      console.log(user, "fgjhf");
      req.user = user;
      //req.user.save();
      console.log(req.user);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoose
  .connect(
    "mongodb+srv://saicharanars:724242726@cluster0.sexo9ar.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log(User)
    User.findOne().then((user) => {
      if (!user) {
        new User({
          name: "sai",
          email: "sai@b.com",
          cart: {
            items: [],
          },
        });
        user.save();
        console.log("started", user.name);
      }
      console.log("started", user.name);
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
