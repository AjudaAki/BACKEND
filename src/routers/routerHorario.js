const express = require('express');
const router = express.Router();

const horariosController = require('../controllers/horariosController');
const horariosMiddleware = require('../middlewares/horariosMiddleware');

//Horários
router.get('/horarios', horariosController.getAll);
router.post('/horarios', 
    horariosMiddleware.validateUsuario,
    horariosMiddleware.validateHoraInicio,
    horariosMiddleware.validateHoraTermino,
    horariosMiddleware.validateDiaSemana,
    horariosMiddleware.horarioEmUso,
    horariosController.createHorario);
router.delete('/horarios/:id_horario', horariosController.deleteHorario);
router.put('/horarios/:id_horario', horariosController.updateHorario);

module.exports = router;