const connection = require('./connection');

const getAll = async () => {
    const [comentario] = await connection.execute('SELECT * FROM COMENTARIOS');
    return comentario;
};

const createComentario = async ( id_usuario, id_perfil, comentario_usuario) => {
    const query = "INSERT INTO COMENTARIOS (id_usuario, id_perfil, comentario_usuario) VALUES (?, ?, ?)";
    const [createdComentario] = await connection.execute(query, [id_usuario, id_perfil, comentario_usuario]);
    return { message: 'opa, rolou'}
};

const deleteComentario = async (id_comentario) => {
    const query = "DELETE FROM COMENTARIOS WHERE id_comentario = ?";
    return await connection.execute(query, [id_comentario]);

}

const updateComentario = async (id_comentario, COMENTARIOS) => {
    const query = "UPDATE COMENTARIOS SET comentario_usuario = ? WHERE id_comentario = ?";
    const {comentario_usuario} = COMENTARIOS;
    const updateComentario = await connection.execute(query, [comentario_usuario, id_comentario]);
    return updateComentario;
}

module.exports = {
    getAll,
    createComentario,
    deleteComentario,
    updateComentario,
}

