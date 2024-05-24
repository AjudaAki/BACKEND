const express = require('express');
const router = express.Router();

const localizacaoController = require('../controllers/localizacaoController');
const localizacaoMiddleware = require('../middlewares/localizacaoMiddleware');


router.get('/localizacao' ,localizacaoController.getAll);
router.post('/localizacao', 
    localizacaoMiddleware.validateEstado, 
    localizacaoMiddleware.validateCidade, 
    localizacaoMiddleware.validateBairro, 
    localizacaoMiddleware.validateRua, 
    localizacaoMiddleware.validateNum,
    localizacaoController.createLocalizacao);
router.delete('/localizacao/:id_usuario', localizacaoController.deleteLocalizacao);
router.put('/localizacao/:id_usuario', localizacaoMiddleware.validateEstado,localizacaoController.updateLocalizacao);

module.exports = router;