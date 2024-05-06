const validateName = (request, response, next) => {
    const { body } = request;

    if (body.nome === undefined){
        return response.status(400).json({message: "O campo nome é necessário"});
    };

    if (body.nome == ""){
        return response.status(400).json({message: "O campo nome não pode estar vazio"});
    };

    next();
};

const validateEmail = (request, response, next) => {
    const { body } = request;

    if (body.email == undefined){
        return response.status(400).json({message: "O campo email é necessário"});
    };

    if (body.email == ""){
        return response.status(400).json({message: "O campo email não pode estar vazio"});
    };

    next();
}
    
const validatePassword = (request, response, next) => {
    const { body } = request;

    if (body.senha == undefined){
        return response.status(400).json({message: "O campo senha é necessário"});
    };

    if (body.senha == ""){
        return response.status(400).json({message: "O campo senha não pode estar vazio"});
    };

    if (body.senha.length < 8){
        return response.status(400).json({message: "A senha deve ter pelo menos 8 caracteres"});
    };

    next();
};

module.exports = {
    validateName,
    validateEmail,
    validatePassword,
}