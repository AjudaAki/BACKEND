const connection = require('./connection');
const { Favoritos } = require('../models/favoritoModel');

const getAll = async (usuario_logado) => {
    const query = `
    SELECT 
        u.id, 
        u.nome, 
        u.descricao_rapida, 
        u.img_perfil, 
        CAST(u.modo_professor AS UNSIGNED) AS modo_professor, 
        t.nome_tag 
    FROM 
        USUARIOS u 
    INNER JOIN 
        TAGS_PROFESSOR tp 
    ON 
        u.id = tp.id_usuario 
    INNER JOIN 
        TAGS t 
    ON 
        tp.id_tag = t.id 
    INNER JOIN 
        FAVORITOS f 
    ON 
        u.id = f.usuario_relacionado 
    WHERE 
        u.modo_professor = 1 
    AND 
        f.usuario_logado = ?
`;

const [result] = await connection.execute(query, [usuario_logado]);
return result;

};

const createFavorito = async (usuario_logado, usuario_relacionado) => {
    const query = "INSERT INTO FAVORITOS (usuario_logado, usuario_relacionado) VALUES (?, ?)";
    await connection.execute(query, [usuario_logado, usuario_relacionado]);
    return { message: 'Favorito criado com sucesso!' };
};

const deleteFavorito = async (FAVORITOS) => {
    const { usuario_logado, usuario_relacionado } = FAVORITOS;
    console.log(`DELETE FROM FAVORITOS WHERE usuario_logado = ${usuario_logado} AND usuario_relacionado = ${usuario_relacionado}`);
    const query = "DELETE FROM FAVORITOS WHERE usuario_logado = ? AND usuario_relacionado = ?";
    const [deletedFavorito] = await connection.execute(query, [usuario_logado, usuario_relacionado]);
    if (!deletedFavorito.affectedRows) {
        throw new Error('Favorito não encontrado.');
    }
    return deletedFavorito;
    
}


module.exports = {
    getAll,
    createFavorito,
    deleteFavorito,
}



