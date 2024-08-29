const express = require('express');
const router = express.Router();
const metaController = require('../controllers/metaController');

router.post('/meta/create', metaController.createMeta);
router.get('/meta/', metaController.getMeta);
router.get('/meta/page/:page', metaController.getPageMeta);
router.get('/meta/:id', metaController.getMetaById);
router.put('/meta/:id', metaController.updateMeta);
router.delete('/meta/:id', metaController.deleteMeta);

module.exports = router;
