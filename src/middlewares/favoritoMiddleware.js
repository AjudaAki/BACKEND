const connection = require('../repositories/connection');


const validateExisteUsuario = async (request, response, next) => {
    const { usuario_relacionado } = request.body;

    try {
        const query = "SELECT * FROM USUARIOS WHERE id = ?";
        const [rows] = await connection.execute(query, [usuario_relacionado]);

        if (rows.length < 1) {
            return response.status(400).json({ message: "O usuário não existe" });
        }

        next();
    } catch (error) {
        console.error("Erro ao verificar favorito", error);
        return response.status(500).json({ message: "Erro interno do servidor" });
    }
}

const validateFavorito = async (request, response, next) => {
    try {
        const { usuario_logado, usuario_relacionado } = request.body;
        const [favorito] = await connection.execute('SELECT * FROM FAVORITOS WHERE usuario_logado = ? AND usuario_relacionado = ?', [usuario_logado, usuario_relacionado]);
        if (favorito.length !== 0) {
            return response.status(404).json({ message: 'Esse favorito já existe' });
        }
        next();
    } catch (error) {
        console.error("Erro ao validar favorito:", error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const validateIdUsuario = (request, response, next) => {
    const { body } = request;
    const idLogado = request.userId; 

    if (typeof body.usuario_logado !== 'number' || isNaN(body.usuario_logado) || body.usuario_logado !== idLogado) {
        return response.status(400).json({ message: "Usuário inválido" });
    }

    next();
};

const validateIdUsuarioParam = (request, response, next) => {
    const { params } = request;
    const idLogado = request.userId; 

    if (isNaN(params.usuario_logado) || parseInt(params.usuario_logado) !== parseInt(idLogado)) {
        return response.status(400).json({ message: "Usuário inválido" });
    }

    next();
};

module.exports = {
    validateFavorito,
    validateIdUsuario,
    validateIdUsuarioParam,
    validateExisteUsuario
}

