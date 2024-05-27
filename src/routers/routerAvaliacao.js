const express = require('express');
const router = express.Router();

const avaliacaoController = require('../controllers/avaliacaoController');
const avaliacaoMiddleware = require('../middlewares/avaliacaoMiddleware'); 

//Avaliação
router.get('/avaliacao', avaliacaoController.getAll);
router.post('/avaliacao', avaliacaoMiddleware.validateAvaliacao,avaliacaoController.createAvaliacao);
router.delete('/avaliacao/:id_avaliacao_professor', avaliacaoController.deleteAvaliacao);
router.put('/avaliacao/:id_avaliacao_professor',  
    avaliacaoMiddleware.validateAvaliacao,
    avaliacaoController.updateAvaliacao);
module.exports = router;