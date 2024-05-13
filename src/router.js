const express = require('express');
const router = express.Router();

//Controllers
const userController = require('./controllers/userController');
const tagsController = require('./controllers/tagsController');
const horariosController = require('./controllers/horariosController');
const tagsProfController = require('./controllers/tagsProfController');

//Middlewares
const userMiddleware = require('./middlewares/userMiddleware');
const tagsMiddleware = require('./middlewares/tagsMiddleware');
const horariosMiddleware = require('./middlewares/horariosMiddleware');
const tagsProfMiddleware = require('./middlewares/tagsProfMiddleware');

//Login
const autenticarAuth = require('./auth/autenticar');

//Usuarios
router.get('/users', userController.getAll);
router.post('/users/professor', 
    userMiddleware.validateName, 
    userMiddleware.validateEmail, 
    userMiddleware.validatePassword, 
    userMiddleware.validateTelefone,
    userMiddleware.validateCpf,
    userMiddleware.validateNascimento,
    userMiddleware.validateDescricao,
    userMiddleware.validateDescricaoRapida,
    userController.createProfessor);

router.post('/users/aluno', 
    userMiddleware.validateName, 
    userMiddleware.validateEmail, 
    userMiddleware.validatePassword, 
    userMiddleware.validateTelefone,
    userMiddleware.validateCpf,
    userMiddleware.validateNascimento,
    userController.createAluno);

router.delete('/users/:id', userController.deleteUser);
router.put('/users/:id', userController.updateUser);

//Tags
router.get('/tags', tagsController.getAll);
router.post('/tags', tagsMiddleware.validateNomeTag, tagsMiddleware.TagEmUso, tagsController.createTag);
router.delete('/tags/:id_tag', tagsController.deleteTag);
router.put('/tags/:id_tag', tagsMiddleware.validateNomeTag, tagsController.updateTag);

//Tags Professor
router.get('/tagsprof', tagsProfController.getAll);
router.post('/tagsprof', tagsProfMiddleware.tagProfEmUso, tagsProfController.createTagProf);
router.delete('/tagsprof/:id_usuario/:id_tag', tagsProfController.deleteTagProf);

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

//Login
router.post('/login', autenticarAuth.autenticar);

module.exports = router;