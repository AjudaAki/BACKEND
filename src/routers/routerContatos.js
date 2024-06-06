const express = require('express');
const router = express.Router();

const contatosController = require('../controllers/contatosController');
const contatosMiddleware = require('../middlewares/contatosMiddleware');
const usuarioLogadoMiddleware = require('../auth/usuarioLogadoMiddleware');

//Contatos
router.get('/contatos/:id_professor', usuarioLogadoMiddleware.validateToken, contatosController.getAll);
router.post('/contatos', 
    usuarioLogadoMiddleware.validateToken, 
    contatosMiddleware.validateIdUsuario,
    contatosMiddleware.validateProfessorId,
    contatosMiddleware.validateFieldsLenght,
    contatosController.createContato);
router.put('/contatos/:id_professor', 
    usuarioLogadoMiddleware.validateToken, 
    contatosMiddleware.validateIdUsuarioParam,
    contatosMiddleware.validateFieldsLenght,
    contatosController.updateContato); 

module.exports = router;