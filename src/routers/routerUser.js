const express = require('express');
const router = express.Router();

//Controllers
const userController = require('../controllers/userController');

//Middlewares
const userMiddleware = require('../middlewares/userMiddleware');

//Login
const autenticarAuth = require('../auth/autenticar');

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


//Login
router.post('/login', autenticarAuth.autenticar);

module.exports = router;