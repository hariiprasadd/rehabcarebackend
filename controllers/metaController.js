const Meta = require('../models/metaModel');

const createMeta = async (req, res) => {
    try {
        const { page, meta_title, meta_description, meta_keywords } = req.body;
        const meta = new Meta({ page, meta_title, meta_description, meta_keywords });
        await meta.save();
        res.status(201).json(meta);
    } catch (error) {
        console.error('Error creating metadata:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getMeta = async (req, res) => {
    try {
        const meta = await Meta.find();
        res.status(200).json(meta);
    } catch (error) {
        console.error('Error fetching metadata:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getPageMeta = async (req, res) => {
    try {
        const { page } = req.params;
        const meta = await Meta.findOne({ page });
        if (!meta) {
            return res.status(404).json({ message: 'Meta not found' });
        }
        res.status(200).json(meta);
    } catch (error) {
        console.error('Error fetching page metadata:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getMetaById = async (req, res) => {
    try {
        const meta = await Meta.findById(req.params.id);
        if (!meta) {
            return res.status(404).json({ message: 'Meta not found' });
        }
        res.status(200).json(meta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateMeta = async (req, res) => {
    try {
        const { page, meta_title, meta_description, meta_keywords } = req.body;

        // Find the metadata by ID
        const updatedMeta = await Meta.findById(req.params.id);

        // If metadata is not found, return 404 error
        if (!updatedMeta) {
            return res.status(404).json({ message: 'Metadata not found' });
        }

        // Update the metadata fields
        updatedMeta.page = page;
        updatedMeta.meta_title = meta_title;
        updatedMeta.meta_description = meta_description;
        updatedMeta.meta_keywords = meta_keywords;

        // Save the updated metadata
        await updatedMeta.save();

        // Return the updated metadata in the response
        res.status(200).json(updatedMeta);
    } catch (error) {
        console.error('Error updating metadata:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteMeta = async (req, res) => {
    try {
        const deletedMeta = await Meta.findById(req.params.id);

        if (!deletedMeta) {
            return res.status(404).json({ message: 'Metadata not found' });
        }
        await Meta.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Metadata deleted successfully' });
    } catch (error) {
        console.error('Error deleting metadata:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    createMeta,
    getMeta,
    getPageMeta,
    getMetaById,
    updateMeta,
    deleteMeta
};
