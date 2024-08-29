const Icon = require('../models/iconModel');

const createIcon = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file ? req.file.path : null;

        const icon = new Icon({ name, image });
        await icon.save();
        res.status(201).json(icon);
    } catch (error) {
        console.error('Error creating icon:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllIcons = async (req, res) => {
    try {
        const icons = await Icon.find();
        res.status(200).json(icons);
    } catch (error) {
        console.error('Error fetching icons:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getIconById = async (req, res) => {
    try {
        const icon = await Icon.findById(req.params.id);
        if (!icon) {
            return res.status(404).json({ message: 'Icon not found' });
        }
        res.status(200).json(icon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateIcon = async (req, res) => {
    try {
        const { name } = req.body;
        const existingIcon = await Icon.findById(req.params.id);
        if (!existingIcon) {
            return res.status(404).json({ message: 'Icon not found' });
        }
        const image = req.file ? req.file.path : existingIcon.image;
        existingIcon.name = name;
        existingIcon.image = image;
        const updatedIcon = await existingIcon.save();
        res.status(200).json(updatedIcon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteIcon = async (req, res) => {
    try {
        const deletedIcon = await Icon.findById(req.params.id);

        if (!deletedIcon) {
            return res.status(404).json({ message: 'Icon not found' });
        }

        await Icon.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Icon deleted successfully' });
    } catch (error) {
        console.error('Error deleting icon:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createIcon,
    getAllIcons,
    getIconById,
    updateIcon,
    deleteIcon
};
