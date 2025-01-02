// src/routes/postRoute.js

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Định nghĩa route GET để lấy danh sách bài viết
router.get('/', postController.getAllPosts);

// Định nghĩa route POST để thêm bài viết mới
router.post('/', postController.createPost);

// Định nghĩa route PUT để sửa bài viết
router.put('/:id', postController.updatePost);

// Định nghĩa route DELETE để xóa bài viết
router.delete('/:id', postController.deletePost);

module.exports = router;
