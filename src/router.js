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
const contatosController = require('./controllers/contatosController');

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
const contatosMiddleware = require('./middlewares/contatosMiddleware')
const usuarioLogadoMiddleware = require('./auth/usuarioLogadoMiddleware');
const autenticarAuth = require('./auth/autenticar');

//Usuarios
router.get('/users', usuarioLogadoMiddleware.validateToken, userController.getAll);

router.get('/users/professor', usuarioLogadoMiddleware.validateToken, userController.getProfs);

router.get('/users/professor/:id', usuarioLogadoMiddleware.validateToken, userController.getOneProf);

router.get('/users/aluno/:id', usuarioLogadoMiddleware.validateToken, userController.getOneAluno);

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

router.put('/users/:id', usuarioLogadoMiddleware.validateToken, userController.updateUser);

//Tags
router.get('/tags', usuarioLogadoMiddleware.validateToken,  tagsController.getAll);
router.post('/tags', usuarioLogadoMiddleware.validateToken, tagsMiddleware.validateNomeTag, tagsMiddleware.TagEmUso, tagsController.createTag);
// router.delete('/tags/:id_tag', usuarioLogadoMiddleware.validateToken, tagsController.deleteTag);
// router.put('/tags/:id_tag', usuarioLogadoMiddleware.validateToken, tagsMiddleware.validateNomeTag, tagsController.updateTag);

//Tags Professor
router.get('/users/professor/tags/:id_usuario', usuarioLogadoMiddleware.validateToken, tagsProfController.getAll);
router.post('/users/professor/tags',
    usuarioLogadoMiddleware.validateToken,
    tagsProfMiddleware.tagProfEmUso,
    tagsProfMiddleware.validateIdTag,
    tagsProfMiddleware.validateIdUsuario,
    tagsProfController.createTagProf
);
router.delete('/users/professor/tags/:id_usuario/:id_tag',
    usuarioLogadoMiddleware.validateToken,
    tagsProfMiddleware.validateIdTagParam,
    tagsProfMiddleware.validateIdUsuarioParam,
    tagsProfController.deleteTagProf
);

//Horários
router.get('/horarios', usuarioLogadoMiddleware.validateToken, horariosController.getAll);
router.post('/horarios', 
    usuarioLogadoMiddleware.validateToken,  
    horariosMiddleware.validateUsuario,
    horariosMiddleware.validateHoraInicio,
    horariosMiddleware.validateHoraTermino,
    horariosMiddleware.validateDiaSemana,
    horariosMiddleware.horarioEmUso,
    horariosController.createHorario);
router.delete('/horarios/:id_horario', usuarioLogadoMiddleware.validateToken, horariosController.deleteHorario);
router.put('/horarios/:id_horario', usuarioLogadoMiddleware.validateToken, horariosController.updateHorario);

//Avaliação
router.get('/avaliacao', usuarioLogadoMiddleware.validateToken, avaliacaoController.getAll);
router.post('/avaliacao', usuarioLogadoMiddleware.validateToken, avaliacaoMiddleware.validateAvaliacao,avaliacaoController.createAvaliacao);
router.delete('/avaliacao/:id_avaliacao_professor', usuarioLogadoMiddleware.validateToken, avaliacaoController.deleteAvaliacao);
router.put('/avaliacao/:id_avaliacao_professor',  
    usuarioLogadoMiddleware.validateToken, 
    avaliacaoMiddleware.validateAvaliacao,
    avaliacaoController.updateAvaliacao);

//Favoritos
router.get('/favorito', usuarioLogadoMiddleware.validateToken, favoritoController.getAll);
router.post('/favorito', usuarioLogadoMiddleware.validateToken, favoritoMiddleware.validateFavorito,favoritoController.createFavorito);
router.delete('/favorito/:usuario_logado/:usuario_relacionado', usuarioLogadoMiddleware.validateToken, favoritoController.deleteFavorito);

//Comentarios
router.get('/comentario', usuarioLogadoMiddleware.validateToken, comentarioController.getAll);
router.post('/comentario', 
    usuarioLogadoMiddleware.validateToken, 
    comentarioMiddleware.validateComentario, 
    comentarioMiddleware.validateCaracter, 
    comentarioController.createComentario, );
router.delete('/comentario/:id_comentario', usuarioLogadoMiddleware.validateToken, comentarioController.deleteComentario);
router.put('/comentario/:id_comentario', 
    usuarioLogadoMiddleware.validateToken, 
    comentarioMiddleware.validateComentario, 
    comentarioMiddleware.validateCaracter,
    comentarioController.updateComentario);

//Preços
router.get('/preco', usuarioLogadoMiddleware.validateToken, precoController.getAll);
router.post('/preco', 
    usuarioLogadoMiddleware.validateToken, 
    precoMiddleware.validateExiste, 
    precoMiddleware.validatePrecoMin,
    precoMiddleware.validatePrecoMax,
    precoController.createPreco);
// router.delete('/preco/:id_preco_professor', usuarioLogadoMiddleware.validateToken, precoController.deletePreco);
router.put('/preco/:id_preco_professor', usuarioLogadoMiddleware.validateToken, precoMiddleware.validateExiste, precoMiddleware.validatePrecoMin, precoMiddleware.validatePrecoMax,precoController.updatePreco);

//Localização
router.get('/localizacao', usuarioLogadoMiddleware.validateToken, localizacaoController.getAll);
router.post('/localizacao', 
    usuarioLogadoMiddleware.validateToken, 
    localizacaoMiddleware.validateEstado, 
    localizacaoMiddleware.validateCidade, 
    localizacaoMiddleware.validateBairro, 
    localizacaoMiddleware.validateRua, 
    localizacaoMiddleware.validateNum,
    localizacaoController.createLocalizacao);
// router.delete('/localizacao/:id_usuario', usuarioLogadoMiddleware.validateToken, localizacaoController.deleteLocalizacao);
router.put('/localizacao/:id_usuario', usuarioLogadoMiddleware.validateToken, localizacaoMiddleware.validateEstado,localizacaoController.updateLocalizacao);

//Contatos
router.get('/contatos/:id_professor', usuarioLogadoMiddleware.validateToken, contatosController.getAll);
router.post('/contatos', 
    usuarioLogadoMiddleware.validateToken, 
    contatosMiddleware.validateProfessorId,
    contatosMiddleware.validateProfessorContato,
    contatosMiddleware.validateFieldsLenght,
    contatosController.createContato);
router.put('/contatos/:id_professor', 
    usuarioLogadoMiddleware.validateToken, 
    contatosMiddleware.validateProfessorIdParams,
    contatosMiddleware.validateProfessorContatoParams,
    contatosMiddleware.validateFieldsLenght,
    contatosController.updateContato); 

//Login
router.post('/login', autenticarAuth.autenticar);

module.exports = router;