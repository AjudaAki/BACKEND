const express = require('express');
const router = express.Router();

const favoritoController = require('../controllers/favoritoController');
const favoritoMiddleware = require('../middlewares/favoritoMiddleware');
const usuarioLogadoMiddleware = require('../auth/usuarioLogadoMiddleware');

//Favorito
router.get('/favorito', usuarioLogadoMiddleware.validateToken, favoritoController.getAll);
router.post('/favorito', usuarioLogadoMiddleware.validateToken, favoritoMiddleware.validateIdUsuario, favoritoMiddleware.validateFavorito,favoritoController.createFavorito);
router.delete('/favorito/:usuario_logado/:usuario_relacionado', usuarioLogadoMiddleware.validateToken, favoritoMiddleware.validateIdUsuarioParam,    favoritoController.deleteFavorito);


module.exports = router;