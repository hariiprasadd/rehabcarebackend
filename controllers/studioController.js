const Studio = require('../models/studioModel')

const createStudio = async (req, res) => {
    try {
        const { title, subtitle, description, description1, short, experts, meta_title, meta_description, meta_keywords, slug } = req.body;
        const images = req.files;
        const image = images.image ? images.image[0].path : null;
        const image1 = images.image1 ? images.image1[0].path : null;

        const currentDate = new Date();
        const options = {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false, timeZone: 'UTC' // Customize options as per your requirement
        };
        const formattedDate = currentDate.toLocaleString('en-US', options);
        const studio = new Studio({ title, subtitle, description, description1, image, image1, short, slug, experts, meta_title, meta_description, meta_keywords, posted_date: formattedDate });
        await studio.save();
        res.status(201).json(studio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllStudio = async (req, res) => {
    try {
        const studios = await Studio.find();
        res.status(200).json(studios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLimitedStudios = async (req, res) => {
    try {
        const studios = await Studio.find().limit(6);
        res.status(200).json(studios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getStudio = async (req, res) => {
    try {
        const studio = await Studio.findOne({ slug: req.params.slug });
        if (!studio) {
            return res.status(404).json({ message: 'Studio not found' });
        }
        res.status(200).json(studio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateStudio = async (req, res) => {
    try {
        const { title, subtitle, description, description1, short, experts, meta_title, meta_description, meta_keywords } = req.body;
        const studio = await Studio.findOne({ slug: req.params.slug });
        if (!studio) {
            return res.status(404).json({ message: 'Studio not found' });
        }
        const images = req.files;
        const image = images.image ? images.image[0].path : studio.image;
        const image1 = images.image1 ? images.image1[0].path : studio.image1;
        studio.title = title;
        studio.subtitle = subtitle;
        studio.description = description;
        studio.description1 = description1;
        studio.short = short;
        studio.image = image;
        studio.image1 = image1;
        studio.experts = experts;
        studio.meta_title = meta_title;
        studio.meta_description = meta_description;
        studio.meta_keywords = meta_keywords;
        await studio.save();
        res.status(200).json(studio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteStudio = async (req, res) => {
    try {
        const studio = await Studio.findOne({ slug: req.params.slug });
        if (!studio) {
            return res.status(404).json({ message: 'Studio not found' });
        }
        await Studio.findOneAndDelete({ slug: req.params.slug });
        res.status(200).json({ message: 'Studio deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createStudio,
    getAllStudio,
    getLimitedStudios,
    getStudio,
    updateStudio,
    deleteStudio
}
