const express = require("express");
const router = express.Router();
const { Product, User } = require("../mongoose/mongoose");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const JWT_SECRET = "M72JGNgJpX";
const MiddleWare=require("../MiddleWare/MiddleWare")
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.find();
    if (!allProducts) {
      return res.status(404).json({ message: "No products found" });
    }
    res.send(allProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving products" });
  }
});

Product.collection.createIndex({ name: 1 });
Product.collection.createIndex({ createdAt: -1 });

router.post("/",MiddleWare, async (req, res) => {
  console.log(req.body);
  const { productID, name, price, featured, rating, createdAt, company } = req.body;
  const findId=await Product.findOne({productID})
  try {
    const { productID, name, price, featured, rating, createdAt, company } = req.body;
    const findId=await Product.findOne({productID})
    if(findId){
      return res.json({message:"Product already found"})
    }
    const newProduct = new Product({
      productID,
      name,
      price,
      featured,
      rating,
      createdAt,
      company,
    });
    await newProduct.save();
    console.log("Product Saved");
    res.status(200).json({ message: "Product saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving the product" });
  }
});

router.put("/:id",MiddleWare, async (req, res) => {
  try {
    const {id} = (req.params);
    const { productID, name, price, featured, rating, createdAt, company } = req.body;

    const update = await Product.findOneAndUpdate({productID}, {
      productID:productID,
      name:name,
      price:price,
      featured:featured,
      rating:rating,
      createdAt:createdAt,
      company:company,
    });

    if (!update) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log(update);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating the product" });
  }
});

router.delete("/:id",MiddleWare, async (req, res) => {
  try {
    const { id } = Number(req.params);
   const{productID}=req.body
    const deletedProduct = await Product.findOneAndDelete({productID});
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("Deleted");
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting the product" });
  }
});

router.get("/featured", MiddleWare,async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true });
    if (!featuredProducts.length) {
      return res.status(404).json({ message: "No featured products found" });
    }
    res.send(featuredProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving featured products" });
  }
});

router.get("/price/:maxprice",MiddleWare, async (req, res) => {
    try {
        const{maxprice}=(req.params)
        op=(Number((maxprice).slice(1,)))
        const products = await Product.find({ price: { $lt: op} });
         if (!products.length) {
        return res.status(404).json({ message: "No products found within the specified price range" });
      }
      
      res.send(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error retrieving products" });
    }
  });
  
  

router.get("/rating/:minrating",MiddleWare, async (req, res) => {
  try {
    const op=req.params.minrating
    const minRating = Number(op.slice(1,));
    const products = await Product.find({ rating: { $gt: minRating } });
    if (!products.length) {
      return res.status(404).json({ message: "No products found with the specified minimum rating" });
    }
    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving products" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    const user = await User.findOne({Email: email });
   
    if (!user || !(await bcrypt.compare(password, user.Password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ email: user.Email }, JWT_SECRET);

    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
});


router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, Email, password } = req.body;
    const existingUser = await User.find({ Email : Email});
    if (existingUser.length>0) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const saltRounds = 10;
    
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const newUser = new User({
      FirstName:firstName,
      LastName:lastName,
      Email,
      Password:hashedPassword
    });

    await newUser.save();
    console.log("User created successfully");

    const token = jwt.sign({ email:newUser.Email }, JWT_SECRET);

    res.send({ message: 'User created successfully', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error signing up" });
  }
});

module.exports = router;