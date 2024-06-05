const express = require('express');
const router = express.Router();

const horariosController = require('../controllers/horariosController');
const horariosMiddleware = require('../middlewares/horariosMiddleware');
const usuarioLogadoMiddleware = require('../auth/usuarioLogadoMiddleware');

//Horários
router.get('/horarios', usuarioLogadoMiddleware.validateToken, horariosController.getAll);
router.post('/horarios', 
    horariosMiddleware.validateUsuario,
    horariosMiddleware.validateHoraInicio,
    horariosMiddleware.validateHoraTermino,
    horariosMiddleware.validateDiaSemana,
    horariosMiddleware.horarioEmUso,
    horariosController.createHorario);
router.delete('/horarios/:id_horario', usuarioLogadoMiddleware.validateToken, horariosController.deleteHorario);
router.put('/horarios/:id_horario', usuarioLogadoMiddleware.validateToken, horariosController.updateHorario);

module.exports = router;