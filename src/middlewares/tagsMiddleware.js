const validateNomeTag = (request, response, next) => {
    const { body } = request;

    if (typeof body.nome_tag !== 'string' || body.nome_tag.trim() === '') {
        return response.status(400).json({ message: "É necessário definir um nome para a tag" });
    }

    next();
};

const TagEmUso = (request, response, next) => {
    //verificar se a tag está em uso ao tentar deletar
};

module.exports = {
    validateNomeTag,
};