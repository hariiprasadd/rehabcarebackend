const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
    name: String,
    image: String,
    category: String,
    posted_date: String
});

const Gallery = mongoose.model('Gallery', gallerySchema)

module.exports = Gallery;