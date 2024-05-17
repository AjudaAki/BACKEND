const connection = require('../repositorys/connection');

const tagProfEmUso = async (request, response, next) => {
    const { id_usuario, id_tag } = request.body;

    const [tag] = await connection.execute('SELECT * FROM TAGS_PROFESSOR WHERE id_usuario = ? AND id_tag = ?', [id_usuario, id_tag]);
    if (tag.length > 0) {
        return response.status(401).json({ message: 'Esse professor já possui esta tag' });
    }
        
    next();
};

const validateIdUsuario = (request, response, next) => {
    const { body } = request;

    if (typeof body.id_usuario !== 'number' || isNaN(body.id_usuario)) {
        return response.status(400).json({ message: "É necessário atribuir um usuário a essa tag" });
    }

    next();
};

const validateIdTag = (request, response, next) => {
    const { body } = request;

    if (typeof body.id_tag !== 'number' || isNaN(body.id_tag)) {
        return response.status(400).json({ message: "É necessário atribuir uma tag a esse usuário" });
    }

    next();
};

const validateIdUsuarioParam = (request, response, next) => {
    const id_usuario = parseInt(request.params.id_usuario);

    if (isNaN(id_usuario)) {
        return response.status(400).json({ message: "É necessário atribuir um usuário a essa tag" });
    }

    next();
};

const validateIdTagParam = (request, response, next) => {
    const id_tag = parseInt(request.params.id_tag);

    if (isNaN(id_tag)) {
        return response.status(400).json({ message: "É necessário atribuir uma tag a esse usuário" });
    }

    next();
};


module.exports = {
    tagProfEmUso,
    validateIdTag,
    validateIdUsuario,
    validateIdUsuarioParam,
    validateIdTagParam
}