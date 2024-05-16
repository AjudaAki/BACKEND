const connection = require('../models/connection');

const { response } = require("express");

const validateFavorito = async (request, response, next) => {
    try {
        const { usuario_logado, usuario_relacionado } = request.body;
        const [favorito] = await connection.execute('SELECT * FROM FAVORITOS WHERE usuario_logado = ? AND usuario_relacionado = ?', [usuario_logado, usuario_relacionado]);
        if (favorito.length === 0) {
            return response.status(404).json({ message: 'Esse favorito não existe' });
        }
        next();
    } catch (error) {
        console.error("Erro ao validar favorito:", error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports = {
    validateFavorito,
}

