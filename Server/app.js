const express = require('express')
const Jwt = require("jsonwebtoken")
const Mongodb = require('mongodb')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./schema/user')
const Product = require('./schema/product')
const jwt_token = 'we-eee';
const app=express()
app.use(express.json())
app.use(cors())


const mongotoken = "mongodb+srv://shavoddin54:D8cwv7X5P0EgrquN@cluster0.rzpj4b5.mongodb.net/JWT?retryWrites=true&w=majority"
mongoose.connect(mongotoken)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });









  app.post('/register', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = new User({ email, password });
  
      await user.save();
  
      res.send("Successfully posted");
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).send("Internal Server Error");
    }
  });



  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email)
      const user = await User.findOne({ email, password }).select("-password");
  
      if (user) {
        Jwt.sign({ user }, jwt_token , { expiresIn: "2h" }, (err, token) => {
          if (err) {
            res.status(500).send(err);
          } else {
            console.log(token)
            console.log(user)
            res.status(200).send({ user, auth: token });
          }
        });
      } else {
        res.status(404).send("There is no user");
      }
    } catch (error) {
      console.error("Error finding user:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.post('/product',async (req,res)=>{
        const {name,rating,price} = req.body;
        try {
            const product = new Product({name,rating,price})
            const pro = await product.save()
            res.status(200).send(pro)
        } catch (error) {
          res.status(500).send(error);
        }

  })
  app.get('/product',verifyToken,async (req,res)=>{
        try {
            const product = await Product.find()
            res.status(200).send(product)
        } catch (error) {
          res.status(500).send(error);
        }

  })

  function verifyToken(req,res,next) {
    let token = req.headers['authorization'];
    if(token) {
      token = token.split(' ')[1];
      console.log(token)
      Jwt.verify(token,jwt_token,(err,valid) => {
        if(err) {
          res.status(401).send({result:"please provide valid token"})
        } else {
          next();
        }
      })
    }
    else {
      res.status(403).send({result:"please provide a token"})
    }

  }






app.listen(4000, () => {
    console.log("Your website is running at https://localhost:4000/");
});
