const express = require('express');
const router = express.Router();

const comentarioController = require('../controllers/comentarioController');
const comentarioMiddleware = require('../middlewares/comentarioMiddleware');
const usuarioLogadoMiddleware = require('../auth/usuarioLogadoMiddleware');

//Comentario
router.get('/comentario', usuarioLogadoMiddleware.validateToken, comentarioController.getAll);
router.post('/comentario', 
    usuarioLogadoMiddleware.validateToken,
    comentarioMiddleware.validateIdUsuario,
    comentarioMiddleware.validateComentario, 
    comentarioMiddleware.validateCaracter, 
    comentarioController.createComentario, );

module.exports = router;
