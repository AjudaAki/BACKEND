const validateNomeTag = (request, response, next) => {
    const { body } = request;

    if (body.nome_tag === undefined){
        return response.status(400).json({message: "O nome da tag é necessário"});
    };

    if (body.nome_tag == ""){
        return response.status(400).json({message: "'nome_tag' não pode ser vazio"});
    };

    next();
};

module.exports = {
    validateNomeTag,
}