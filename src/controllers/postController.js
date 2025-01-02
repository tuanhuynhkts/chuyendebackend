// src/controllers/postController.js

const Post = require('../models/post');

// Lấy tất cả bài viết
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách bài viết" });
    }
};

// Thêm bài viết mới
exports.createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm bài viết mới" });
    }
};

// Sửa bài viết
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: "Bài viết không tồn tại" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi sửa bài viết" });
    }
};

// Xóa bài viết
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Bài viết không tồn tại" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa bài viết" });
    }
};
