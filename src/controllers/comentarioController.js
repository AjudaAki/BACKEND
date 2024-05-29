const { request, response } = require('express');
<<<<<<< HEAD
const comentarioRepository = require('../repositorys/comentarioRepository');
=======
const comentarioModel = require('../models/comentarioModel');
>>>>>>> 0513d43a9cad092f9a262239bc99c5713f7773e7

const getAll = async (request, response) => {
    const comentarios = await comentarioRepository.getAll();
    return response.status(200).json(comentarios); 
}

const createComentario = async (request, response) => {
    const {id_usuario, id_perfil, comentario_usuario} = request.body;
    const createdComentario = await comentarioRepository.createComentario(id_usuario, id_perfil, comentario_usuario);
    return response.status(201).json(createdComentario);
};

const deleteComentario = async (request, response) => {
    const {id_comentario} = request.params;
    const result = await comentarioRepository.deleteComentario(id_comentario);
        return response.status(404).json({ message: 'Comentario deletada com sucesso! ' }); 
    
}

const updateComentario = async (request, response) => {
    const {id_comentario} = request.params;
    await comentarioRepository.updateComentario(id_comentario, request.body);
    return response.status(200).json({ message: 'Atualização de comentário feito com sucesso'});

}



module.exports = {
    getAll,
    createComentario,
    deleteComentario, 
    updateComentario,
}