

const express=require("express")
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Optional: for MongoDB session storage
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');

const app=express()

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
    secret: 'EcommerceSiteIsOurSecret',  // Change this to a secret key for security
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },  // Set to true if using HTTPS
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://isma_khan:i9TyWVdqfZZ0QSAt@cluster0.1m91b.mongodb.net/?retryWrites=true&w=majority", // Update with your MongoDB connection string
    })
  }));

const products = [
    { id: 1, name: 'Assorted Coffee', category: 'Groceries', description:"Neque porro quisquam est, qui dolore ipsum quia dolor sit amet, consectetur adipisci velit, sed quia non incidunt lores ta porro ame. numquam eius modi tempora incidunt lores ta porro ame.", price: 35, image: '/imgs/card1.jpg' },
    { id: 2, name: 'Hand Sanitizer', category: 'Groceries', description:"Neque porro quisquam est, qui dolore ipsum quia dolor sit amet, consectetur adipisci velit, sed quia non incidunt lores ta porro ame. numquam eius modi tempora incidunt lores ta porro ame.",price: 15, image: '/imgs/card2.jpg' },
    { id: 3, name: 'HandPicked Red Chills', category: 'Groceries', description:"Neque porro quisquam est, qui dolore ipsum quia dolor sit amet, consectetur adipisci velit, sed quia non incidunt lores ta porro ame. numquam eius modi tempora incidunt lores ta porro ame.",price: 19, image: '/imgs/card3.jpg' },
    { id: 4, name: 'Natural Extracted Edible Oil', category: 'Groceries', description:"Neque porro quisquam est, qui dolore ipsum quia dolor sit amet, consectetur adipisci velit, sed quia non incidunt lores ta porro ame. numquam eius modi tempora incidunt lores ta porro ame.",price: 25, image: '/imgs/card4.jpg' }
  ];
  
app.get("/", function(req,res){
    res.render("index" , {products})
})
app.get("/everything", function(req,res){
    res.render("everything")
})
app.get("/groceries", function(req,res){
    res.render("groceries")
})
app.get("/juices", function(req,res){
    res.render("juices")
})
app.get("/about", function(req,res){
    res.render("about")
})
app.get("/contact", function(req,res){
    res.render("contact")
})


app.get('/product/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);
    
    if (product) {
      res.render('product', { product });
    } else {
      res.status(404).send('Product not found');
    }
  });

  

app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    console.log(cart)
    res.render('cart', { cart });

});
app.post('/cart', (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id == productId);

  if (!product) {
      return res.status(404).send('Product not found');
  }

  // Initialize cart in the session if not present
  if (!req.session.cart) {
      req.session.cart = [];
  }

  // Add product to cart
  req.session.cart.push({ ...product, quantity: parseInt(quantity) });

  res.redirect('/cart');
});
app.listen(3000, function(req,res){
    console.log("Server is running")
})