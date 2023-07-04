const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://k2subhash45:Subhash@cluster0.f8xfyd9.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const productSchema = new mongoose.Schema({
  productID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  featured: { type: Boolean },
  rating: { type: Number },
  createdAt: { type: Date, default: Date.now },
  company: { type: String },
});

const userSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Product, User };
