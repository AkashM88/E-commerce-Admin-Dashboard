const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const products = require('./data/products');
dotenv.config();

// Connect to the database
mongoose.connect(process.env.MONGO_URI, {
  
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Seed products into the database
const importData = async () => {
  try {
    await Product.deleteMany(); // Clears all existing products in the database

    await Product.insertMany(products); // Inserts the sample products

    console.log('Product Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
