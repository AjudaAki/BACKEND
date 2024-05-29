const connection = require('./connection');

const getAll = async () => {
    const [comentario] = await connection.execute('SELECT * FROM COMENTARIOS');
    return comentario;
};

const createComentario = async (id_usuario, id_perfil, comentario_usuario) => {
    const query = "INSERT INTO COMENTARIOS (id_usuario, id_perfil, comentario_usuario) VALUES (?, ?, ?)";
    await connection.execute(query, [id_usuario, id_perfil, comentario_usuario]);
    return { message: 'Comentário criado com sucesso.' };
};


module.exports = {
    getAll,
    createComentario,
}

