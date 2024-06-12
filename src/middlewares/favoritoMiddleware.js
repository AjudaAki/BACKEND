const connection = require('../repositories/connection');

const validateFavorito = async (request, response, next) => {
    try {
        const { usuario_relacionado } = request.body;
        const usuario_logado = request.userId;

        if (!usuario_logado || !usuario_relacionado) {
            return response.status(400).json({ message: 'Parâmetros inválidos' });
        }

        const [favorito] = await connection.execute(
            'SELECT * FROM FAVORITOS WHERE usuario_logado = ? AND usuario_relacionado = ?',
            [usuario_logado, usuario_relacionado]
        );

        if (favorito.length !== 0) {
            return response.status(409).json({ message: 'Esse favorito já existe' });
        }

        next();
    } catch (error) {
        console.error("Erro ao validar favorito:", error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const validateIdUsuarioParam = (request, response, next) => {
    const idLogado = request.userId;
    const { usuario_logado } = request.params;

    if (isNaN(usuario_logado) || parseInt(usuario_logado) !== parseInt(idLogado)) {
        return response.status(400).json({ message: "Usuário inválidooo" });
    }

    next();
};

const usuarioExiste = async (request, response, next) => {
    const { usuario_relacionado } = request.body;

    const [usuario] = await connection.execute('SELECT * FROM USUARIOS WHERE id = ?', [usuario_relacionado]);
    if (usuario.length == 0) {
        return response.status(401).json({ message: 'Esse professor não existe' });
    }
        
    next();
};

module.exports = {
    validateFavorito,
    validateIdUsuarioParam,
    usuarioExiste
};
