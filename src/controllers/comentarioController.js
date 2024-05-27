const { request, response } = require('express');
const comentarioModel = require('../models/comentarioModel');

const getAll = async (request, response) => {
    const comentarios = await comentarioModel.getAll();
    return response.status(200).json(comentarios); 
}

const createComentario = async (request, response) => {
    const {id_usuario, id_perfil, comentario_usuario} = request.body;
    const createdComentario = await comentarioModel.createComentario(id_usuario, id_perfil, comentario_usuario);
    return response.status(201).json(createdComentario);
};

const deleteComentario = async (request, response) => {
    const {id_comentario} = request.params;
    const result = await comentarioModel.deleteComentario(id_comentario);
        return response.status(404).json({ message: 'Comentario deletada com sucesso! ' }); 
    
}

const updateComentario = async (request, response) => {
    const {id_comentario} = request.params;
    await comentarioModel.updateComentario(id_comentario, request.body);
    return response.status(200).json({ message: 'Atualização de comentário feito com sucesso'});

}



module.exports = {
    getAll,
    createComentario,
    deleteComentario, 
    updateComentario,
}