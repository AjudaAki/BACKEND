const connection = require('./connection');
const { Comentario } = require('../models/comentarioModel');

const getAll = async (id_perfil) => {
    const [comentarios] = await connection.execute("SELECT * FROM COMENTARIOS WHERE id_perfil = ?", [id_perfil]);
    return comentarios;
};

const createComentario = async (id_usuario, id_perfil, comentario_usuario) => {
    const query = "INSERT INTO COMENTARIOS (id_usuario, id_perfil, comentario_usuario) VALUES (?, ?, ?)";
    await connection.execute(query, [id_usuario, id_perfil, comentario_usuario]);
    return { message: 'Comentário criado com sucesso.' };
};


module.exports = {
    getAll,
    createComentario
}

