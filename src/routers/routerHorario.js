const express = require('express');
const router = express.Router();

const horariosController = require('../controllers/horariosController');
const horariosMiddleware = require('../middlewares/horariosMiddleware');
const usuarioLogadoMiddleware = require('../auth/usuarioLogadoMiddleware');

//Horários
router.get('/horarios', usuarioLogadoMiddleware.validateToken, horariosController.getAll);
router.post('/horarios', 
    usuarioLogadoMiddleware.validateToken,
    horariosMiddleware.validateIdUsuarioFlexible,
    horariosMiddleware.validateFields,
    // horariosMiddleware.validateHoraInicio,
    // horariosMiddleware.validateHoraTermino,
    // horariosMiddleware.validateDiaSemana,
    // horariosMiddleware.horarioEmUso,
    horariosController.createHorario);
// router.delete('/horarios/:id_usuario/:dia_semana', usuarioLogadoMiddleware.validateToken, horariosMiddleware.validateIdUsuarioFlexible, horariosController.deleteHorario);
router.put('/horarios', usuarioLogadoMiddleware.validateToken, horariosMiddleware.validateIdUsuarioFlexible, horariosController.updateHorario);

module.exports = router;