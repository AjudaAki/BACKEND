const connection = require("../repositories/connection");

const validateAvaliacao = (request, response, next) => {
    const { nota } = request.body;
    const notaNumber = parseFloat(nota);
    
    if (typeof nota !== 'number' || isNaN(notaNumber) || notaNumber < 0 || notaNumber > 5) {
        return response.status(400).json({ message: "Coloque uma nota válida entre 0 e 5." });
    }
    request.notaNumber = notaNumber
    next();
};

const validateIdUsuario = (request, response, next) => {
    const { body } = request;

    if (parseInt(body.usuario_avaliador) === parseInt(body.professor_avaliado)) {
        return response.status(400).json({ message: "Não é possível se autoavaliar!" });
    }
    next();
};

const validateAvaliacaoDuplicada = async (request, response, next) => {
    const { body } = request;
    const { usuario_avaliador, professor_avaliado } = body; 
    try {
        const query = "SELECT * FROM AVALIACAO_PROFESSOR WHERE usuario_avaliador = ? AND professor_avaliado = ?";
        const [rows] = await connection.query(query, [usuario_avaliador, professor_avaliado]);

        if (rows.length > 0) {
            return response.status(400).json({ message: "Apenas é permitido fazer uma avaliação para cada professor." });
        }

        next();
    } catch (error) {
        console.error("Erro ao verificar avaliação duplicada:", error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports = {
    validateAvaliacao,
    validateIdUsuario,
    validateAvaliacaoDuplicada
}
