// src/models/post.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// tạo model từ schema và xuất ra
const Product = mongoose.model('Product', productSchema);
module.exports = Product;