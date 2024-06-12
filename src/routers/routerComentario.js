const express = require('express');
const router = express.Router();

const comentarioController = require('../controllers/comentarioController');
const comentarioMiddleware = require('../middlewares/comentarioMiddleware');
const usuarioLogadoMiddleware = require('../auth/usuarioLogadoMiddleware');

router.get('/comentario/:id_perfil', usuarioLogadoMiddleware.validateToken, comentarioController.getAll);
router.post('/comentario/:id_perfil',
    usuarioLogadoMiddleware.validateToken,
    comentarioMiddleware.validateComentMeuPerfil,
    comentarioMiddleware.validateIdUsuario,
    comentarioMiddleware.usuarioExiste,
    comentarioMiddleware.validateComentario, 
    comentarioMiddleware.validateCaracter, 
    comentarioController.createComentario);

module.exports = router;
