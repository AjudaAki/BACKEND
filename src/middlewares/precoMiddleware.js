const connection = require('../repositories/connection');

const { response } = require("express");

const validateExiste = async (request, response, next) =>{
    try {
        const { id_professor } = request.params;
        const [existe] = await connection.execute('SELECT * FROM USUARIOS WHERE id = ?', [id_professor]);
        if (existe.length == 0){
            return response.status(404).json({ message: 'Esse professor não existe'});            
        }
        next();
    } catch (error) {
        console.error("Erro em relação ao usuário.", error);
        return response.status(500).json({ message: 'Erro interno no servidor' })

    }
};

const validatePrecoMin = (request, response, next) => {
    const { preco_minimo } = request.body; 
    if (preco_minimo.trim() === '') {
        return response.status(400).json({ message: 'O campo não pode ser vazio' });
    }
    if (preco_minimo.length > 8) {
        return response.status(404).json({ message: 'Número de caracteres acima do permitido no campo "preço mínimo".' });
    }
    next();
    
};

const validatePrecoMax = (request, response, next) => {
    const { preco_maximo } = request.body;
    if (preco_maximo.trim() === '') {
        return response.status(400).json({ message: 'O campo não pode ser vazio' });
    }
    if (preco_maximo.length > 8) {
        return response.status(404).json({ message: 'Número de caracteres acima do permitido no campo "preço máximo".' });
    }
    
    next();
};

const validateIdUsuarioParam = (request, response, next) => {
    const { params } = request;
    const idLogado = request.userId; 

    if (isNaN(params.id_professor) || parseInt(params.id_professor) !== parseInt(idLogado)) {
        return response.status(400).json({ message: "Usuário inválido" });
    }

    next();
};

/**
 * -middleware para o professor não atribuir dois preços a ele ok
    -middleware para o professor não atribuir duas localizações a ele ok 
    -put de atualização de localização bugado, mesmo quando passo um id de um professor que não existe ele retorna uma mensagem de sucesso
    -um usuário não pode comentar no próprio perfil
    -um usuário pode avaliar se passando por outro usuário
 */
const validateDoisPrecoNao = async (request, response, next) => {
    const { id_professor } = request.body;
    try {
        const query = "SELECT * FROM PRECO_PROFESSOR WHERE id_professor = ?";
        const [rows] = await connection.execute(query, [id_professor]);
        if (rows.length > 0) {
        return response.status(400).json({ message: "Você já definiu um preço intermediário para as suas aulas. Por favor, altere o valor existente." });
    }
        
    next();
    } catch (error) {
    console.error("Erro ao verificar preço intermediário:", error);
    return response.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports = {
    validateExiste,
    validateIdUsuarioParam,
    validatePrecoMin,
    validatePrecoMax,
    validateDoisPrecoNao,
};



