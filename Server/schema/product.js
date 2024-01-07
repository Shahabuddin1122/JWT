const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    rating: String,
    price: String
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;