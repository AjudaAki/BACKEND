const connection = require('../repositories/connection');

const { response } = require("express");


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


const validateDoisPrecoNao = async (request, response, next) => {
    const { id_professor } = request.params;
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
    validateIdUsuarioParam,
    validatePrecoMin,
    validatePrecoMax,
    validateDoisPrecoNao,
};