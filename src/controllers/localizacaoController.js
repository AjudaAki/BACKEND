<<<<<<< HEAD
const localizacaoRepository = require('../repositorys/localizacaoRepository');
=======
const localizacaoModel = require('../models/localizacaoModel');
>>>>>>> 0513d43a9cad092f9a262239bc99c5713f7773e7

const getAll = async (request, response) => {
    const localizacao = await localizacaoRepository.getAll();
    return response.status(200).json(localizacao);
}

const createLocalizacao = async (request, response) => {
    const {id_usuario, estado, cidade, bairro, rua, numero_casa} = request.body;
    const createdLocalizacao = await localizacaoRepository.createLocalizacao(id_usuario, estado, cidade, bairro, rua, numero_casa);
    return response.status(201).json(createdLocalizacao);
}

const deleteLocalizacao = async (request, response) => {
    const {id_usuario} = request.params;
    const result = await localizacaoRepository.deleteLocalizacao(id_usuario);
        return response.status(401).json({ message: 'Localizacao deletada colega :D'})
}

const updateLocalizacao = async (request, response) => {
    const {id_usuario} = request.params;
    await localizacaoRepository.updateLocalizacao(id_usuario, request.body);
    return response.status(200).json({ message: "Atualizacao da lista mais gay de 2017"})
}

module.exports = {
    getAll,
    createLocalizacao,
    deleteLocalizacao,
    updateLocalizacao,
}