const express = require('express');
const router = express.Router();

//Controllers
const userController = require('../controllers/userController');

//Middlewares
const userMiddleware = require('../middlewares/userMiddleware');
const usuarioLogadoMiddleware = require('../auth/usuarioLogadoMiddleware');

const contatosMiddleware = require('../middlewares/contatosMiddleware');
const horariosMiddleware = require('../middlewares/horariosMiddleware');
const localizacaoMiddleware = require('../middlewares/localizacaoMiddleware');
const tagsProfMiddleware = require('../middlewares/tagsProfMiddleware');
const precoMiddleware = require('../middlewares/precoMiddleware');

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

router.get('/users/professores/card', usuarioLogadoMiddleware.validateToken, userController.getProfessoresCard);

router.get('/users/professor/:id_prof', usuarioLogadoMiddleware.validateToken, userController.getSelecionarProf)
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

router.post('/users/professor/all', 
    userMiddleware.validateName, 
    userMiddleware.validateEmail, 
    userMiddleware.validatePassword, 
    userMiddleware.validateTelefone,
    userMiddleware.validateCpf,
    userMiddleware.validateNascimento,
    userMiddleware.validateDescricao,
    userMiddleware.validateDescricaoRapida,
    contatosMiddleware.validateFieldsLenght,
    precoMiddleware.validatePrecoMin,
    precoMiddleware.validatePrecoMax,
    localizacaoMiddleware.validateEstado, 
    localizacaoMiddleware.validateCidade, 
    localizacaoMiddleware.validateBairro, 
    localizacaoMiddleware.validateRua, 
    localizacaoMiddleware.validateNum,
    tagsProfMiddleware.validateIdTag,
    userController.createProfAll);

//Login
router.post('/login', autenticarAuth.autenticar);

module.exports = router;