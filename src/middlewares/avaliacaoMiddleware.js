const { response } = require("express");

const validateAvaliacao = (request, response, next) => {
    const { nota } = request.body;
    const notaNumber = parseFloat(nota);
    if (typeof nota !== 'number' || isNaN(notaNumber) || notaNumber < 0 || notaNumber > 5) {
        return response.status(400).json({ message: "Coloque uma nota válida entre 0 e 5." });
    }
    request.notaNumber = notaNumber
    next();

}

const validateIdUsuario = (request, response, next) => {
    const { body } = request;
    const idLogado = request.userId; 

    if (isNaN(body.usuario_avaliador) || parseInt(body.usuario_avaliador)) {
        return response.status(400).json({ message: "Não é possível se autoavaliar!" });
    }

//middleware para não deixar o usuário fazer duas avaliações no mesmo professor 


    next();

    
};

module.exports = {
    validateAvaliacao,
    validateIdUsuario
}
