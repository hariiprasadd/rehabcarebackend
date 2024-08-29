const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    message: String,
    posted_date: String
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact