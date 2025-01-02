const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

// Tạo cấu trúc thư mục nếu chưa có
const dirs = [
    'src/controllers',
    'src/routes',
    'src/models',
    'src/config',
    'src/middleware',
    'src/public',
    'src/utils'
];



// Định nghĩa các file cần tạo
const files = {
    'src/config/db.js': `const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully.");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;`,

    'src/server.js': `// src/server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Import cors

dotenv.config();

// Kết nối với MongoDB
connectDB();

const app = express();

app.use(cors()); // Sử dụng cors

// Middleware để xử lý request body dưới dạng JSON
app.use(express.json());

// Sử dụng các route
app.use('/posts', require('./routes/postRoute'));

// Cấu hình cổng và lắng nghe
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(\`Server is running on port \${PORT}\`);
});
`,

    'src/routes/postRoute.js': `// src/routes/postRoute.js

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
`,

    'src/controllers/postController.js': `// src/controllers/postController.js

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
`,

    'src/models/post.js': `// src/models/post.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Tạo model từ schema và xuất ra
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
`,

    '.env': `MONGO_URI=mongodb+srv://course1:9vzHXIBwTFCoRw1d@cluster0.kq7cizs.mongodb.net/test

PORT=5000`,
};

// Tạo các file với nội dung
const createFile = (file, content) => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        console.log(`Tạo file: ${file}`);
    }
};




// Tạo thư mục
dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Tạo các file với nội dung
for (const [file, content] of Object.entries(files)) {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, content);
        console.log(`Created file: ${file}`);
    }
}



// Cài đặt các dependencies
console.log('Installing dependencies...');
execSync('npm init -y', { stdio: 'inherit' });
execSync('npm i express body-parser mongoose axios dotenv cors', { stdio: 'inherit' });
execSync('npm install --save-dev nodemon', { stdio: 'inherit' });

// Cập nhật phần "scripts" trong package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

packageJson.scripts = {
    "start": "nodemon src/server.js",
    "dev": "nodemon src/server.js",
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('Scripts updated in package.json');

