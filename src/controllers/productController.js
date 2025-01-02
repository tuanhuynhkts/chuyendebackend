// src/controllers/productController.js

const Product = require('../models/product');

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm" })
    }
};

// Thêm sản phẩm mới
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm sản phẩm mới' });
    }
};

// Sửa sản phẩm
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Sản phẩmphẩm không tồn tại" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi sửa Sản phẩm" });
    }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(400).json({ message: "Bài viết không tồn tại" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa bài viết" });
    }
}