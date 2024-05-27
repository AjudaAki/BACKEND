const { response, request } = require("express");

const validateEstado = async (request, response, next) => {
    const { estado } = request.body;
    
    if (typeof estado !== 'string') {
        return response.status(400).json({ message: 'O campo "estado" deve ser uma string.' });
    }

    if (estado.trim() === '') {
        return response.status(400).json({ message: 'O campo não pode ser vazio' });
    }
    if (estado.length > 255) {
        return response.status(404).json({ message: 'Número de caracteres em "estado" acima do possível.' });
    }
    
    next();
}

const validateCidade = async (request, response, next) => {
    const { cidade } = request.body;
    
    if (typeof cidade !== 'string') {
        return response.status(400).json({ message: 'O campo "cidade" deve ser uma string.' });
    }

    if (cidade.trim() === '') {
        return response.status(400).json({ message: 'O campo não pode ser vazio' });
    }
    if (cidade.length > 255) {
        return response.status(404).json({ message: 'Número de caracteres em "cidade" acima do possível.' });
    }
    
    next();
}

const validateBairro = async (request, response, next) => {
    const { bairro } = request.body;
    
    if (typeof bairro !== 'string') {
        return response.status(400).json({ message: 'O campo "bairro" deve ser uma string.' });
    }

    if (bairro.trim() === '') {
        return response.status(400).json({ message: 'O campo não pode ser vazio' });
    }
    if (bairro.length > 255) {
        return response.status(404).json({ message: 'Número de caracteres em "bairro" acima do possível.' });
    }
    
    next();
}

const validateRua = async (request, response, next) => {
    const { rua } = request.body;
    
    if (typeof rua !== 'string') {
        return response.status(400).json({ message: 'O campo "rua" deve ser uma string.' });
    }

    if (rua.trim() === '') {
        return response.status(400).json({ message: 'O campo não pode ser vazio' });
    }
    if (rua.length > 255) {
        return response.status(404).json({ message: 'Número de caracteres em "rua" acima do possível.' });
    }

    next();
}

const validateNum = async (request, response, next) => {
    const { numero_casa } = request.body;

    if (typeof numero_casa !== "number") {
        return response.status(400).json({ message: 'O campo "numero" deve ser um número.' });
    }

    if (numero_casa.trim() === '') {
        return response.status(400).json({ message: 'O campo não pode ser vazio' });
    }
    next();
}

const validateIdUsuarioParam = (request, response, next) => {
    const { params } = request;
    const idLogado = request.userId; 

    if (isNaN(params.id_usuario) || parseInt(params.id_usuario) !== parseInt(idLogado)) {
        return response.status(400).json({ message: "Usuário inválido" });
    }

    next();
};



module.exports = {
    validateEstado,
    validateCidade,
    validateBairro,
    validateRua,
    validateNum,
    validateIdUsuarioParam
}