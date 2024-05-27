const express = require('express');
const router = express.Router();

const comentarioController = require('../controllers/comentarioController');
const comentarioMiddleware = require('../middlewares/comentarioMiddleware');

//Comentario
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

module.exports = router;
