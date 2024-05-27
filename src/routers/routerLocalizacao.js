const express = require('express');
const router = express.Router();

const localizacaoController = require('../controllers/localizacaoController');
const localizacaoMiddleware = require('../middlewares/localizacaoMiddleware');
const usuarioLogadoMiddleware = require('../auth/usuarioLogadoMiddleware');

router.get('/localizacao', usuarioLogadoMiddleware.validateToken, localizacaoController.getAll);
router.post('/localizacao', 
    localizacaoMiddleware.validateEstado, 
    localizacaoMiddleware.validateCidade, 
    localizacaoMiddleware.validateBairro, 
    localizacaoMiddleware.validateRua, 
    localizacaoMiddleware.validateNum,
    localizacaoController.createLocalizacao);
// router.delete('/localizacao/:id_usuario', usuarioLogadoMiddleware.validateToken, localizacaoController.deleteLocalizacao);
router.put('/localizacao/:id_usuario', usuarioLogadoMiddleware.validateToken, localizacaoMiddleware.validateIdUsuarioParam, localizacaoMiddleware.validateEstado,localizacaoController.updateLocalizacao);

module.exports = router;