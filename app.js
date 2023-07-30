const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoconnect=require('./util/database').mongoconnect;

const errorController = require('./controllers/error');
const User=require('./models/user');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
   
  User.findById('64c55bc5dc3fe5840bde6475')
    .then((user) => {
      console.log(user,"fgjhf")  
      req.user =  new User(user.name,user.email,user.cart,user._id)
      //req.user.save();
      console.log(req.user)
      next();
    })
    .catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoconnect(()=>{
    
    app.listen(3000);
})
