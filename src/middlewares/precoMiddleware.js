const connection = require('../models/connection');

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

module.exports = {
    validateExiste,
    validateIdUsuarioParam,
    validatePrecoMin,
    validatePrecoMax,
};



