const express = require('express');
const router = express.Router();

//Controllers
const userController = require('./controllers/userController');
const tagsController = require('./controllers/tagsController');
const horariosController = require('./controllers/horariosController');
const tagsProfController = require('./controllers/tagsProfController');
const horariosProfController = require('./controllers/horariosProfController');

//Middlewares
const userMiddleware = require('./middlewares/userMiddleware');
const tagsMiddleware = require('./middlewares/tagsMiddleware');
const horariosMiddleware = require('./middlewares/horariosMiddleware');

//Login
const autenticarAuth = require('./auth/autenticar');

//Usuarios
router.get('/users', userController.getAll);
router.post('/users/professor', 
    userMiddleware.validateName, 
    userMiddleware.validateEmail, 
    userMiddleware.validatePassword, 
    userController.createProfessor);

router.post('/users/aluno', 
    userMiddleware.validateName, 
    userMiddleware.validateEmail, 
    userMiddleware.validatePassword, 
    userController.createAluno);

router.delete('/users/:id', userController.deleteUser);
router.put('/users/:id', userController.updateUser);

//Tags
router.get('/tags', tagsController.getAll);
router.post('/tags', tagsMiddleware.validateNomeTag, tagsController.createTag);
router.delete('/tags/:id_tag', tagsController.deleteTag);
router.put('/tags/:id_tag', tagsController.updateTag);

//Tags Professor
router.get('/tagsprof', tagsProfController.getAll);
router.post('/tagsprof', tagsProfController.createTagProf);
router.delete('/tagsprof/:id_usuario/:id_tag', tagsProfController.deleteTagProf);

//Horários
router.get('/horarios', horariosController.getAll);
router.post('/horarios', 
    horariosMiddleware.validateHoraInicio,
    horariosMiddleware.validateHoraTermino,
    horariosMiddleware.validateDiaSemana,
    horariosController.createHorario);
router.delete('/horarios/:id_horario', horariosController.deleteHorario);
router.put('/horarios/:id_horario', horariosController.updateHorario);

//Horários Professor
router.get('/horariosprof', horariosProfController.getAll);
router.post('/horariosprof', horariosProfController.createHorariosProf);
router.delete('/horariosprof/:id_usuario/:id_horario', horariosProfController.deleteHorariosProf);

//Login
router.post('/login', autenticarAuth.autenticar);

module.exports = router;