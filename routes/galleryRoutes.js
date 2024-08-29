const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const upload = require('../middleware/upload');

router.post('/gallery/create', upload.single('image'), galleryController.createGallery);
router.get('/gallery/', galleryController.getAllGallerys);
router.get('/gallery/category/:category', galleryController.getGalleriesByCategory);
router.delete('/gallery/:id', galleryController.deleteGallery);

module.exports = router;
