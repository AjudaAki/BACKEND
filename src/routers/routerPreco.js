const express = require('express');
const router = express.Router();

const precoController = require('../controllers/precoController');
const precoMiddleware = require('../middlewares/precoMiddleware');

router.get('/preco', precoController.getAll);
router.post('/preco', 
    precoMiddleware.validateExiste, 
    precoMiddleware.validatePrecoMin,
    precoMiddleware.validatePrecoMax,
    precoController.createPreco);
router.delete('/preco/:id_preco_professor', precoController.deletePreco);
router.put('/preco/:id_preco_professor', precoMiddleware.validateExiste, precoMiddleware.validatePrecoMin, precoMiddleware.validatePrecoMax,precoController.updatePreco);

module.exports = router;