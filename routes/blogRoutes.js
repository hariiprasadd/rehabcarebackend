const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../middleware/upload');

router.post('/blogs/create', upload.single('image'), blogController.createBlog);
router.get('/blogs/', blogController.getAllBlogs);
router.get('/blogs/home', blogController.getFourBlogs);
router.get('/blogs/:slug', blogController.getBlogBySlug);
router.put('/blogs/:slug', upload.single('image'), blogController.updateBlog);
router.delete('/blogs/:slug', blogController.deleteBlog);

module.exports = router;
