const mongoose = require('mongoose')

const iconSchema = new mongoose.Schema({
    name: String,
    image: String,
})

const Icon = mongoose.model('Icon', iconSchema)

module.exports = Icon