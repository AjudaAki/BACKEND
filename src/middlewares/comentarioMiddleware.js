const connection = require('../models/connection');

const { response, request } = require("express");

const validateComentario = async (request, response, next) => {
    const {comentario_usuario} = request.body;
    if (comentario_usuario.length === 0){
        return response.status(404).json({ message: 'O comentário não pode ser vazio'});
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

const validateIdUsuario = (request, response, next) => {
    const { body } = request;
    const idLogado = request.userId; 

    if (isNaN(body.id_usuario) || parseInt(body.id_usuario) !== parseInt(idLogado)) {
        return response.status(400).json({ message: "Usuário inválido" });
    }

    next();
};

module.exports = {
    validateComentario,
    validateCaracter,
    validateIdUsuario
}