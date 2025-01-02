// src/server.js

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

app.use('/products', require('./routes/productRoute'));

// Cấu hình cổng và lắng nghe
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
