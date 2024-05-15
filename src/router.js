const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');

const avaliacaoController = require('./controllers/avaliacaoController');
const avaliacaoMiddleware = require('./middlewares/avaliacaoMiddleware'); 

const favoritoController = require('./controllers/favoritoController');
const favoritoModel = require('./models/favoritoModel');
const favoritoMiddleware = require('./middlewares/favoritoMiddleware');

const comentarioController = require('./controllers/comentarioController');
const comentarioModel = require('./models/comentarioModel');
const comentarioMiddleware = require('./middlewares/comentarioMiddleware');

const precoController = require('./controllers/precoController');
const precoModel = require('./models/precoModel');
const precoMiddleware = require('./middlewares/precoMiddleware');

const localizacaoController = require('./controllers/localizacaoController');
const localizacaoModel = require('./models/localizacaoModel');
const localizacaoMiddleware = require('./middlewares/localizacaoMiddleware');


router.get('/users', userController.getAll);
router.post('/users', 
    userMiddleware.validateName, 
    userMiddleware.validateEmail, 
    userMiddleware.validatePassword, 
    userController.createUser
);

router.get('/avaliacao', avaliacaoController.getAll);
router.post('/avaliacao', avaliacaoMiddleware.validateAvaliacao, avaliacaoController.createAvaliacao);
router.delete('/avaliacao/:id_avaliacao_professor', avaliacaoController.deleteAvaliacao);
router.put('/avaliacao/:id_avaliacao_professor',  avaliacaoMiddleware.validateAvaliacao,avaliacaoController.updateAvaliacao);

router.get('/favorito', favoritoController.getAll);
router.post('/favorito', favoritoMiddleware.validateFavorito,favoritoController.createFavorito);
router.delete('/favorito/:usuario_logado/:usuario_relacionado', favoritoController.deleteFavorito);

router.get('/comentario', comentarioController.getAll);
router.post('/comentario', comentarioMiddleware.validateComentario, comentarioMiddleware.validateCaracter, comentarioController.createComentario, );
router.delete('/comentario/:id_comentario', comentarioController.deleteComentario);
router.put('/comentario/:id_comentario', comentarioMiddleware.validateComentario, comentarioMiddleware.validateCaracter,comentarioController.updateComentario);

router.get('/preco', precoController.getAll);
router.post('/preco', precoMiddleware.validateExiste, precoMiddleware.validatePrecoMin,precoMiddleware.validatePrecoMax,precoController.createPreco);
router.delete('/preco/:id_preco_professor', precoController.deletePreco);
router.put('/preco/:id_preco_professor', precoMiddleware.validateExiste, precoMiddleware.validatePrecoMin, precoMiddleware.validatePrecoMax,precoController.updatePreco);

router.get('/localizacao' ,localizacaoController.getAll);
router.post('/localizacao', localizacaoMiddleware.validateEstado, localizacaoMiddleware.validateCidade, localizacaoMiddleware.validateBairro, localizacaoMiddleware.validateRua, localizacaoMiddleware.validateNum,localizacaoController.createLocalizacao);
router.delete('/localizacao/:id_usuario', localizacaoController.deleteLocalizacao);
router.put('/localizacao/:id_usuario', localizacaoMiddleware.validateEstado,localizacaoController.updateLocalizacao);

module.exports = router;
