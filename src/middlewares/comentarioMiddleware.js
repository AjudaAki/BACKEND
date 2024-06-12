const connection = require('../repositories/connection');

const { response, request } = require("express");

const validateComentMeuPerfil = async (request, response, next) => {
    const {id_usuario} = request.body;
    const {id_perfil} = request.params;

    if (id_usuario === id_perfil) {
        return response.status(404).json({ message: 'Não é possível comentar no próprio perfil.' });
    }

    next();
}
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

const usuarioExiste = async (request, response, next) => {
    const { id_perfil } = request.params;

    const [usuario] = await connection.execute('SELECT * FROM USUARIOS WHERE id = ?', [id_perfil]);
    if (usuario.length == 0) {
        return response.status(401).json({ message: 'Esse professor não existe' });
    }
        
    next();
};

module.exports = {
    validateComentMeuPerfil,
    validateComentario,
    validateCaracter,
    validateIdUsuario,
    usuarioExiste
}