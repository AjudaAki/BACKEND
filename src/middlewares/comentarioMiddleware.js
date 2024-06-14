const connection = require('../repositories/connection');

const { response, request } = require("express");

const validateExisteUsuario = async (request, response, next) => {
    const { id_perfil } = request.body;

    try {
        const query = "SELECT * FROM USUARIOS WHERE id = ?";
        const [rows] = await connection.execute(query, [id_perfil]);

        if (rows.length < 1) {
            return response.status(400).json({ message: "O usuário não existe" });
        }

        next();
    } catch (error) {
        console.error("Erro ao verificar o comentário", error);
        return response.status(500).json({ message: "Erro interno do servidor" });
    }
}

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
};

const validateCaracter = async (request, response, next) => {
    const { comentario_usuario } = request.body;
    if (comentario_usuario.length > 200) {
        return response.status(404).json({ message: 'Não é possível colocar mais de 200 caracteres no comentário.' });
    }
    next();
};

const validateIdUsuario = (request, response, next) => {
    const { id_usuario, id_perfil } = request.body;

    if (isNaN(id_usuario) || isNaN(id_perfil)) {
        return response.status(400).json({ message: "IDs devem ser números" });
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
    validateExisteUsuario,
    validateComentMeuPerfil,
    validateComentario,
    validateCaracter,
    validateIdUsuario,
    usuarioExiste
}