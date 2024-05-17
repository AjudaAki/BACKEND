const connection = require('../repositorys/connection');

const { response } = require("express");

const validateExiste = async (request, response, next) =>{
    try {
        const { id_professor } = request.body;
        const [existe] = await connection.execute('SELECT * FROM PRECO_PROFESSOR WHERE id_professor = ?', [id_professor]);
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

module.exports = {
    validateExiste,
    validatePrecoMin,
    validatePrecoMax,
};



