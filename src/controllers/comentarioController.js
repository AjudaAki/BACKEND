const { request, response } = require('express');

const comentarioRepository = require('../repositories/comentarioRepository');

const getAll = async (request, response) => {
    const comentarios = await comentarioRepository.getAll();
    return response.status(200).json(comentarios); 
}

const createComentario = async (request, response) => {
    const {id_usuario, id_perfil, comentario_usuario} = request.body;
    const createdComentario = await comentarioRepository.createComentario(id_usuario, id_perfil, comentario_usuario);
    return response.status(201).json(createdComentario);
};

module.exports = {
    getAll,
    createComentario,
}