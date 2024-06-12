const express = require('express');
const router = express.Router();

const precoController = require('../controllers/precoController');
const precoMiddleware = require('../middlewares/precoMiddleware');
const usuarioLogadoMiddleware = require('../auth/usuarioLogadoMiddleware');

router.get('/preco', 
    usuarioLogadoMiddleware.validateToken, 
    precoController.getAll
);

router.post('/preco', 
    usuarioLogadoMiddleware.validateToken, 
    precoMiddleware.validateDoisPrecoNao, 
    precoMiddleware.validatePrecoMin,
    precoMiddleware.validatePrecoMax,
    precoController.createPreco
);

router.put('/preco/:id_professor', 
    usuarioLogadoMiddleware.validateToken,
    precoMiddleware.validateIdUsuarioParam,
    precoMiddleware.validateDoisPrecoNao, 
    precoMiddleware.validatePrecoMin, 
    precoMiddleware.validatePrecoMax,
    precoController.updatePreco
);

module.exports = router;
