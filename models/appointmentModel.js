const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
    service:String,
    posted_date:String
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment