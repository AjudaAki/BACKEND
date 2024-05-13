const connection = require('../models/connection');

const validateNomeTag = (request, response, next) => {
    const { nome_tag } = request.body;

    if (typeof nome_tag !== 'string' || nome_tag.trim() === '') {
        return response.status(400).json({ message: "É necessário definir um nome para a tag" });
    }

    next();
};

const TagEmUso = async (request, response, next) => {
    const { nome_tag } = request.body;

    const [tag] = await connection.execute('SELECT * FROM TAGS WHERE nome_tag = ?', [nome_tag]);
    if (tag.length > 0) {
        return response.status(401).json({ message: 'Essa tag já existe' });
    }
        
    next();
};

module.exports = {
    validateNomeTag,
    TagEmUso
};