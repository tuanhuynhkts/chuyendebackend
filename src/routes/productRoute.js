// src/routes/productRoute.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


//Định nghĩa route GET để lấy danh sách bài viết
router.get('/', productController.getAllProducts);

// Định nghĩa route POST để thêm bài viết mới
router.post('/', productController.createProduct);

// Định nghĩa route PUT để sửa bài viết
router.put('/:id', productController.updateProduct);

// Định nghĩa route DELETE để xóa bài viết
router.delete('/:id', productController.deleteProduct);

module.exports = router;