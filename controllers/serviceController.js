const Service = require('../models/serviceModel')

const createService = async (req, res) => {
    try {
        const { title, subtitle, description, description1, short, icon, experts, meta_title, meta_description, meta_keywords, slug, posted_date } = req.body
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
        const service = new Service({ title, subtitle, description, description1, image, image1, icon, short, experts, meta_title, meta_description, meta_keywords, slug, posted_date: formattedDate })
        await service.save()
        res.status(201).json(service)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllService = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSixServices = async (req, res) => {
    try {
        const services = await Service.find().limit(6);
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getService = async (req, res) => {
    try {
        const service = await Service.findOne({ slug: req.params.slug })
        if (!service) {
            return res.status(404).json({ message: 'Service not found' })
        }
        res.status(200).json(service)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateService = async (req, res) => {
    try {
        const { title, subtitle, description, description1, icon, short, experts, meta_title, meta_description, meta_keywords } = req.body;
        const service = await Service.findOne({ slug: req.params.slug });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        const images = req.files;
        const image = images.image ? images.image[0].path : service.image;
        const image1 = images.image1 ? images.image1[0].path : service.image1;
        service.title = title;
        service.subtitle = subtitle;
        service.description = description;
        service.description1 = description1;
        service.image = image;
        service.image1 = image1;
        service.icon = icon;
        service.short = short;
        service.experts = experts;
        service.meta_title = meta_title;
        service.meta_description = meta_description;
        service.meta_keywords = meta_keywords;
        await service.save();
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteService = async (req, res) => {
    try {
        const service = Service.findOne({ slug: req.params.slug })
        if (!service) {
            return res.status(404).json({ message: 'Service not found' })
        }
        await Service.findOneAndDelete({ slug: req.params.slug })
        res.status(200).json({ message: 'Service deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createService,
    getAllService,
    getSixServices,
    getService,
    updateService,
    deleteService
}