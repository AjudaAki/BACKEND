const { request, response } = require('express');
const precoModel = require('../repositorys/precoModel');

const getAll = async (request, response) => {
    const precos = await precoModel.getAll();
    return response.status(200).json(precos); 
}

const createPreco = async (request, response) => {
    const {id_professor, preco_minimo, preco_maximo} = request.body;
    const createdPreco = await precoModel.createPreco(id_professor, preco_minimo, preco_maximo);
    return response.status(201).json(createdPreco);
}

const deletePreco = async (request, response) => {
    const {id_preco_professor} = request.params;
    const result = await precoModel.deletePreco(id_preco_professor);
        return response.status(404).json({ message: 'Preços deletados com sucesso! '})
}

const updatePreco = async (request, response) => {
    const {id_preco_professor} = request.params;
    await precoModel.updatePreco(id_preco_professor, request.body);
    return response.status(200).json({ message: 'Atualização de preços feita :D '});

}

module.exports = {
    getAll,
    createPreco,
    deletePreco,
    updatePreco,
}