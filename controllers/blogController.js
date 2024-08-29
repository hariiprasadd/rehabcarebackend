const Blog = require('../models/blogModel');

const createBlog = async (req, res) => {
    try {
        const { title, description, meta_title, meta_description, meta_keywords, slug } = req.body;
        const image = req.file ? req.file.path : null; // If multer uploaded a file, get its path

        // Generate current date/time in a specific format
        const currentDate = new Date();
        const options = {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false, timeZone: 'UTC' // Customize options as per your requirement
        };
        const formattedDate = currentDate.toLocaleString('en-US', options);

        const blog = new Blog({ title, description, image, meta_title, meta_description, meta_keywords, slug, posted_date: formattedDate });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ posted_date: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getFourBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ posted_date: -1 }).limit(3);
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateBlog = async (req, res) => {
    try {
        const { title, description, meta_title, meta_description, meta_keywords } = req.body;
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        const image = req.file ? req.file.path : blog.image;
        blog.title = title;
        blog.description = description;
        blog.image = image;
        blog.meta_title = meta_title;
        blog.meta_description = meta_description;
        blog.meta_keywords = meta_keywords;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug })
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' })
        }
        await Blog.findOneAndDelete({ slug: req.params.slug });
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getFourBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog
};
