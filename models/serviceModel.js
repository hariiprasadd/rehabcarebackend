const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    description1: String,
    image: String,
    image1: String,
    icon: String,
    short: String,
    experts: String,
    meta_title: String,
    meta_description: String,
    meta_keywords: String,
    slug: String,
    posted_date: String
});

const Service = mongoose.model('service', serviceSchema);

module.exports = Service