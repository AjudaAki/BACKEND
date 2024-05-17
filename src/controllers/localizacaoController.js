const localizacaoModel = require('../repositorys/localizacaoModel');

const getAll = async (request, response) => {
    const localizacao = await localizacaoModel.getAll();
    return response.status(200).json(localizacao);
}

const createLocalizacao = async (request, response) => {
    const {id_usuario, estado, cidade, bairro, rua, numero_casa} = request.body;
    const createdLocalizacao = await localizacaoModel.createLocalizacao(id_usuario, estado, cidade, bairro, rua, numero_casa);
    return response.status(201).json(createdLocalizacao);
}

const deleteLocalizacao = async (request, response) => {
    const {id_usuario} = request.params;
    const result = await localizacaoModel.deleteLocalizacao(id_usuario);
        return response.status(401).json({ message: 'Localizacao deletada colega :D'})
}

const updateLocalizacao = async (request, response) => {
    const {id_usuario} = request.params;
    await localizacaoModel.updateLocalizacao(id_usuario, request.body);
    return response.status(200).json({ message: "Atualizacao da lista mais gay de 2017"})
}
module.exports = {
    getAll,
    createLocalizacao,
    deleteLocalizacao,
    updateLocalizacao,
}