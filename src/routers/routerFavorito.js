const express = require('express');
const router = express.Router();

const favoritoController = require('../controllers/favoritoController');
const favoritoMiddleware = require('../middlewares/favoritoMiddleware');

//Favorito
router.get('/favorito', favoritoController.getAll);
router.post('/favorito', favoritoMiddleware.validateFavorito,favoritoController.createFavorito);
router.delete('/favorito/:usuario_logado/:usuario_relacionado', favoritoController.deleteFavorito);


module.exports = router;