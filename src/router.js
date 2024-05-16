const express = require('express');
const router = express.Router();


//Controllers
const userController = require('./controllers/userController');
const tagsController = require('./controllers/tagsController');
const horariosController = require('./controllers/horariosController');
const tagsProfController = require('./controllers/tagsProfController');
const avaliacaoController = require('./controllers/avaliacaoController');
const localizacaoController = require('./controllers/localizacaoController');
const precoController = require('./controllers/precoController');
const comentarioController = require('./controllers/comentarioController');
const favoritoController = require('./controllers/favoritoController');

//Middlewares
const userMiddleware = require('./middlewares/userMiddleware');
const tagsMiddleware = require('./middlewares/tagsMiddleware');
const horariosMiddleware = require('./middlewares/horariosMiddleware');
const tagsProfMiddleware = require('./middlewares/tagsProfMiddleware');
const avaliacaoMiddleware = require('./middlewares/avaliacaoMiddleware'); 
const favoritoMiddleware = require('./middlewares/favoritoMiddleware');
const comentarioMiddleware = require('./middlewares/comentarioMiddleware');
const precoMiddleware = require('./middlewares/precoMiddleware');
const localizacaoMiddleware = require('./middlewares/localizacaoMiddleware');

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

//Avaliação
router.get('/avaliacao', avaliacaoController.getAll);
router.post('/avaliacao', avaliacaoMiddleware.validateAvaliacao,avaliacaoController.createAvaliacao);
router.delete('/avaliacao/:id_avaliacao_professor', avaliacaoController.deleteAvaliacao);
router.put('/avaliacao/:id_avaliacao_professor',  
    avaliacaoMiddleware.validateAvaliacao,
    avaliacaoController.updateAvaliacao);

router.get('/favorito', favoritoController.getAll);
router.post('/favorito', favoritoMiddleware.validateFavorito,favoritoController.createFavorito);
router.delete('/favorito/:usuario_logado/:usuario_relacionado', favoritoController.deleteFavorito);

router.get('/comentario', comentarioController.getAll);
router.post('/comentario', 
    comentarioMiddleware.validateComentario, 
    comentarioMiddleware.validateCaracter, 
    comentarioController.createComentario, );
router.delete('/comentario/:id_comentario', comentarioController.deleteComentario);
router.put('/comentario/:id_comentario', 
    comentarioMiddleware.validateComentario, 
    comentarioMiddleware.validateCaracter,
    comentarioController.updateComentario);

router.get('/preco', precoController.getAll);
router.post('/preco', 
    precoMiddleware.validateExiste, 
    precoMiddleware.validatePrecoMin,
    precoMiddleware.validatePrecoMax,
    precoController.createPreco);
router.delete('/preco/:id_preco_professor', precoController.deletePreco);
router.put('/preco/:id_preco_professor', precoMiddleware.validateExiste, precoMiddleware.validatePrecoMin, precoMiddleware.validatePrecoMax,precoController.updatePreco);

router.get('/localizacao' ,localizacaoController.getAll);
router.post('/localizacao', 
    localizacaoMiddleware.validateEstado, 
    localizacaoMiddleware.validateCidade, 
    localizacaoMiddleware.validateBairro, 
    localizacaoMiddleware.validateRua, 
    localizacaoMiddleware.validateNum,
    localizacaoController.createLocalizacao);
router.delete('/localizacao/:id_usuario', localizacaoController.deleteLocalizacao);
router.put('/localizacao/:id_usuario', localizacaoMiddleware.validateEstado,localizacaoController.updateLocalizacao);

//Login
router.post('/login', autenticarAuth.autenticar);

module.exports = router;