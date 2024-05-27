const express = require('express');
const router = express.Router();

const tagsController = require('../controllers/tagsController');
const tagsMiddleware = require('../middlewares/tagsMiddleware');
const usuarioLogadoMiddleware = require('../auth/usuarioLogadoMiddleware');

//Tags
router.get('/tags', usuarioLogadoMiddleware.validateToken, tagsController.getAll);
router.post('/tags', usuarioLogadoMiddleware.validateToken, tagsMiddleware.validateNomeTag, tagsMiddleware.TagEmUso, tagsController.createTag);
// router.delete('/tags/:id_tag', tagsController.deleteTag);
// router.put('/tags/:id_tag', tagsMiddleware.validateNomeTag, tagsController.updateTag);

module.exports = router;