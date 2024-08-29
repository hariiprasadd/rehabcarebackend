const express = require('express');
const router = express.Router();
const iconController = require('../controllers/iconController');
const upload = require('../middleware/upload');

router.post('/icons/create', upload.single('image'), iconController.createIcon);
router.get('/icons/', iconController.getAllIcons);
router.get('/icons/:id', iconController.getIconById);
router.put('/icons/:id', upload.single('image'), iconController.updateIcon)
router.delete('/icons/:id', iconController.deleteIcon);

module.exports = router;
