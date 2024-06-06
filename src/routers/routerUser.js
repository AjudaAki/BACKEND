const express = require('express');
const router = express.Router();

//Controllers
const userController = require('../controllers/userController');

//Middlewares
const userMiddleware = require('../middlewares/userMiddleware');
const usuarioLogadoMiddleware = require('../auth/usuarioLogadoMiddleware');

//Login
const autenticarAuth = require('../auth/autenticar');

//Usuarios
router.get('/users', usuarioLogadoMiddleware.validateToken, userController.getAll);

router.get('/users/aluno/log', usuarioLogadoMiddleware.validateToken, userController.getAlunoLog);

router.get('/users/professor/log', usuarioLogadoMiddleware.validateToken, userController.getProfessorLog);

router.get('/users/professor', usuarioLogadoMiddleware.validateToken, userController.getProfs);

router.get('/users/professor/:id', usuarioLogadoMiddleware.validateToken, userController.getOneProf);

router.get('/users/aluno/:id', usuarioLogadoMiddleware.validateToken, userController.getOneAluno);

router.get('/users/img/:id', userController.getImgPerfil);

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

// router.delete('/users/:id', userController.deleteUser);
router.put('/users/:id', 
    usuarioLogadoMiddleware.validateToken, 
    userMiddleware.validateIdUsuarioParam, 
    userMiddleware.validateName, 
    userMiddleware.validateEmail, 
    userMiddleware.validatePassword, 
    userMiddleware.validateTelefone,
    userMiddleware.validateCpf,
    userMiddleware.validateNascimento,
    userMiddleware.validateDescricao,
    userMiddleware.validateDescricaoRapida,
    userController.updateUser);

//Login
router.post('/login', autenticarAuth.autenticar);

module.exports = router;