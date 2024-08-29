const express = require('express')
const router = express.Router()
const studioController = require('../controllers/studioController')
const upload = require('../middleware/upload');

router.post('/studios/create', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'image1', maxCount: 1 }]), studioController.createStudio)
router.get('/studios', studioController.getAllStudio)
router.get('/studios/home', studioController.getLimitedStudios)
router.get('/studios/:slug', studioController.getStudio)
router.put('/studios/:slug', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'image1', maxCount: 1 }]), studioController.updateStudio)
router.delete('/studios/:slug', studioController.deleteStudio)

module.exports = router