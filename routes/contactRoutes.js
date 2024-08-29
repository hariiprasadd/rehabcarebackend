const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contactController')

router.post('/contact/create', contactController.createContact)
router.get('/contact', contactController.getAllContact)

module.exports = router