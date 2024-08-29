const Gallery = require('../models/galleryModel');

const createGallery = async (req, res) => {
    try {
        const { name, category } = req.body;
        const image = req.file ? req.file.path : null;

        const formattedDate = new Date().toISOString(); // Use ISO format for date

        const gallery = new Gallery({ name, image, category, posted_date: formattedDate });
        await gallery.save(); // Use gallery instead of Gallery
        res.status(201).json(gallery);
    } catch (error) {
        console.error('Error creating gallery:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllGallerys = async (req, res) => { // Use getAllGallerys for consistency
    try {
        const galleries = await Gallery.find();
        res.status(200).json(galleries);
    } catch (error) {
        console.error('Error fetching galleries:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getGalleriesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const galleries = await Gallery.find({ category });
        if (galleries.length === 0) {
            res.status(404).json({ message: 'No galleries found for this category' });
        } else {
            res.status(200).json(galleries);
        }
    } catch (error) {
        console.error('Error fetching galleries by category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteGallery = async (req, res) => {
    try {
        const deletedGallery = await Gallery.findById(req.params.id);

        if (!deletedGallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }
        await Gallery.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Gallery deleted successfully' });
    } catch (error) {
        console.error('Error deleting gallery:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createGallery,
    getAllGallerys,
    getGalleriesByCategory,
    deleteGallery
};
