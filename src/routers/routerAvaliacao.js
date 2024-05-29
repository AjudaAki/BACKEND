const express = require('express');
const router = express.Router();

const avaliacaoController = require('../controllers/avaliacaoController');
const avaliacaoMiddleware = require('../middlewares/avaliacaoMiddleware'); 
const usuarioLogadoMiddleware = require('../auth/usuarioLogadoMiddleware');

//Avaliação
router.get('/avaliacao', usuarioLogadoMiddleware.validateToken, avaliacaoController.getAll);
router.post('/avaliacao', usuarioLogadoMiddleware.validateToken, avaliacaoMiddleware.validateIdUsuario, avaliacaoMiddleware.validateAvaliacao, avaliacaoController.createAvaliacao);

module.exports = router;