const { request, response } = require('express');
<<<<<<< HEAD
const precoRepository = require('../repositorys/precoRepository');
=======
const precoModel = require('../models/precoModel');
>>>>>>> 0513d43a9cad092f9a262239bc99c5713f7773e7

const getAll = async (request, response) => {
    const precos = await precoRepository.getAll();
    return response.status(200).json(precos); 
}

const createPreco = async (request, response) => {
    const {id_professor, preco_minimo, preco_maximo} = request.body;
    const createdPreco = await precoRepository.createPreco(id_professor, preco_minimo, preco_maximo);
    return response.status(201).json(createdPreco);
}

const deletePreco = async (request, response) => {
    const {id_professor} = request.params;
    const result = await precoRepository.deletePreco(id_professor);
        return response.status(404).json({ message: 'Preços deletados com sucesso! '})
}

const updatePreco = async (request, response) => {
    const {id_professor} = request.params;
    await precoRepository.updatePreco(id_professor, request.body);
    return response.status(200).json({ message: 'Atualização de preços feita :D '});
}

module.exports = {
    getAll,
    createPreco,
    deletePreco,
    updatePreco,
}