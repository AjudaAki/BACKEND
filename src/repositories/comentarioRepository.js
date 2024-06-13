const connection = require('./connection');
const { Comentario } = require('../models/comentarioModel');

const getAll = async () => {
    const [comentario] = await connection.execute('SELECT * FROM COMENTARIOS');
    return comentario;
};

const createComentario = async (id_usuario, id_perfil, comentario_usuario) => {
    const query = "INSERT INTO COMENTARIOS (id_usuario, id_perfil, comentario_usuario) VALUES (?, ?, ?)";
    await connection.execute(query, [id_usuario, id_perfil, comentario_usuario]);
    return { message: 'Comentário criado com sucesso.' };
};

const getComentarioNoPerfil = async (id_perfil) => {
    const query = `SELECT c.id, c.id_usuario, c.id_perfil, c.comentario_usuario, u.nome AS nome_usuario, u.img_perfil 
               FROM COMENTARIOS c 
               INNER JOIN USUARIOS u ON c.id_usuario = u.id 
               WHERE c.id_perfil = ?`;
;
    const [comentario] = await connection.execute(query, [id_perfil])
    return comentario;
};


module.exports = {
    getAll,
    createComentario,
    getComentarioNoPerfil
}

