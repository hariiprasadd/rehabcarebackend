const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const upload = require('../middleware/upload');

router.post('/services/create', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'image1', maxCount: 1 }]), serviceController.createService);
router.get('/services', serviceController.getAllService);
router.get('/services/home', serviceController.getSixServices);
router.get('/services/:slug', serviceController.getService);
router.put('/services/:slug', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'image1', maxCount: 1 }]), serviceController.updateService);
router.delete('/services/:slug', serviceController.deleteService);

module.exports = router;
