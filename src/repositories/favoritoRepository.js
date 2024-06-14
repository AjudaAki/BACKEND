const connection = require('./connection');
const { Favoritos } = require('../models/favoritoModel');

const getAll = async (usuario_logado) => {
    const [favorito] = await connection.execute('SELECT * FROM FAVORITOS WHERE usuario_logado = ?', [usuario_logado]);
    return favorito;
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



