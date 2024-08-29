const express = require('express')
const router = express.Router()
const appointmentController = require('../controllers/appointmentController')

router.post('/appointment/create', appointmentController.createAppointment)
router.get('/appointment', appointmentController.getAllAppointment)

module.exports = router