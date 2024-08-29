const mongoose = require('mongoose')

const metaSchema = new mongoose.Schema({
    page: String,
    meta_title: String,
    meta_description: String,
    meta_keywords: String
});

const Meta = mongoose.model('Meta', metaSchema)

module.exports = Meta;