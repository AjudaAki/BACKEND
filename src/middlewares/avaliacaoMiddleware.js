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

module.exports = {
    validateAvaliacao,
}
