const express = require('express');
const router = express.Router();

const precoController = require('../controllers/precoController');
const precoMiddleware = require('../middlewares/precoMiddleware');
const usuarioLogadoMiddleware = require('../auth/usuarioLogadoMiddleware');

router.get('/preco', usuarioLogadoMiddleware.validateToken, precoController.getAll);
router.post('/preco', 
    precoMiddleware.validatePrecoMin,
    precoMiddleware.validatePrecoMax,
    precoController.createPreco);
// router.delete('/preco/:id_preco_professor', usuarioLogadoMiddleware.validateToken, precoController.deletePreco);
router.put('/preco/:id_professor', 
    usuarioLogadoMiddleware.validateToken,  
    precoMiddleware.validateExiste, 
    precoMiddleware.validateIdUsuarioParam,
    precoMiddleware.validatePrecoMin, 
    precoMiddleware.validatePrecoMax,
    precoController.updatePreco);

module.exports = router;