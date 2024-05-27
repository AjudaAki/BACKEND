const express = require('express');
const router = express.Router();

const tagsController = require('../controllers/tagsController');
const tagsMiddleware = require('../middlewares/tagsMiddleware');

//Tags
router.get('/tags', tagsController.getAll);
router.post('/tags', tagsMiddleware.validateNomeTag, tagsMiddleware.TagEmUso, tagsController.createTag);
router.delete('/tags/:id_tag', tagsController.deleteTag);
router.put('/tags/:id_tag', tagsMiddleware.validateNomeTag, tagsController.updateTag);

module.exports = router;