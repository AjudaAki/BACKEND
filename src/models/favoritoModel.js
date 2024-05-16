const connection = require('./connection');

const getAll = async () => {
    const [favorito] = await connection.execute('SELECT * FROM FAVORITOS');
    return favorito;
};

const createFavorito = async (usuario_logado, usuario_relacionado) => {
    const query = "INSERT INTO FAVORITOS (usuario_logado, usuario_relacionado) VALUES (?, ?)";
    const [createdFavorito] = await connection.execute(query, [usuario_logado, usuario_relacionado]);
    return { message: 'deu bom'}
};

const deleteFavorito = async (FAVORITOS) => {
    const { usuario_logado, usuario_relacionado } = FAVORITOS;
    console.log(`DELETE FROM FAVORITOS WHERE usuario_logado = ${usuario_logado} AND usuario_relacionado = ${usuario_relacionado}`);
    const query = "DELETE FROM FAVORITOS WHERE usuario_logado = ? AND usuario_relacionado = ?";
    const [deletedFavorito] = await connection.execute(query, [usuario_logado, usuario_relacionado]);
    console.log(deletedFavorito.affectedRows);
    if (!deletedFavorito.affectedRows) {
        throw new Error('Favorito não encontrado');
    }
    return deletedFavorito;
    
}


module.exports = {
    getAll,
    createFavorito,
    deleteFavorito,
}



