const connection = require('../repositories/connection');

const validateFields = (request, response, next) => {
    const { body } = request;

    if (typeof body.domingo !== 'string' || body.domingo.trim() === '') {
        return response.status(400).json({ message: "O campo domingo não pode ser nulo" });
    }

    if (typeof body.segunda !== 'string' || body.segunda.trim() === '') {
        return response.status(400).json({ message: "O campo segunda não pode ser nulo" });
    }

    if (typeof body.terca !== 'string' || body.terca.trim() === '') {
        return response.status(400).json({ message: "O campo terça não pode ser nulo" });
    }

    if (typeof body.quarta !== 'string' || body.quarta.trim() === '') {
        return response.status(400).json({ message: "O campo quarta não pode ser nulo" });
    }

    if (typeof body.quinta !== 'string' || body.quinta.trim() === '') {
        return response.status(400).json({ message: "O campo quinta não pode ser nulo" });
    }

    if (typeof body.sexta !== 'string' || body.sexta.trim() === '') {
        return response.status(400).json({ message: "O campo sexta não pode ser nulo" });
    }

    if (typeof body.sabado !== 'string' || body.sabado.trim() === '') {
        return response.status(400).json({ message: "O campo sábado não pode ser nulo" });
    }

    next();
};

const validateIdUsuarioParam = (request, response, next) => {
    const { params } = request;
    const idLogado = request.userId; 

    if (isNaN(params.id_usuario) || parseInt(params.id_usuario) !== parseInt(idLogado)) {
        return response.status(400).json({ message: "Usuário inválido" });
    }

    next();
};

const validateIdUsuarioFlexible = (request, response, next) => {
    const idLogado = request.userId;
    let idUsuario;

    if (request.body.id_usuario) {
        idUsuario = request.body.id_usuario;
    } else if (request.params.id_usuario) {
        idUsuario = request.params.id_usuario;
    } else {
        return response.status(400).json({ message: "id_usuario não fornecido" });
    }

    if (isNaN(idUsuario) || parseInt(idUsuario) !== parseInt(idLogado)) {
        return response.status(400).json({ message: "Usuário inválido" });
    }

    next();
};

module.exports = {
    validateFields,
    validateIdUsuarioParam,
    // validateIdUsuario,
    validateIdUsuarioFlexible
};