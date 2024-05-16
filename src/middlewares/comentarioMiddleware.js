const connection = require('../models/connection');

const { response, request } = require("express");

const validateComentario = async (request, response, next) => {
    const {comentario_usuario} = request.body;
    console.log(comentario_usuario);
    console.log(comentario_usuario.length);
    if (comentario_usuario.length === 0){
        return response.status(404).json({ message: 'O comentário não pode ser vazio :('});
    }
    next();

}
const validateCaracter = async (request, response, next) => {
    const { comentario_usuario } = request.body;
    if (comentario_usuario.length > 200) {
        return response.status(404).json({ message: 'Não é possível colocar mais de 200 caracteres no comentário.' });
    }
    next();
}

module.exports = {
    validateComentario,
    validateCaracter,
}