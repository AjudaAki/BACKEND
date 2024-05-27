const express = require('express');
const router = express.Router();

const tagsProfController = require('../controllers/tagsProfController');
const tagsProfMiddleware = require('../middlewares/tagsProfMiddleware');
const usuarioLogadoMiddleware = require('../auth/usuarioLogadoMiddleware');

//Tags Professor
router.get('/users/professor/tags/:id_usuario', usuarioLogadoMiddleware.validateToken, tagsProfController.getAll);
router.post('/users/professor/tags',
    usuarioLogadoMiddleware.validateToken,
    tagsProfMiddleware.tagProfEmUso,
    tagsProfMiddleware.validateIdTag,
    tagsProfMiddleware.validateIdUsuario,
    tagsProfController.createTagProf
);
router.delete('/users/professor/tags/:id_usuario/:id_tag',
    usuarioLogadoMiddleware.validateToken,
    tagsProfMiddleware.validateIdTagParam,
    tagsProfMiddleware.validateIdUsuarioParam,
    tagsProfController.deleteTagProf
);

module.exports = router;