const contatosModel = require('../repositorys/contatosModel');

const getAll = async (request, response) => {
    const contatos = await contatosModel.getAll();
    return response.status(200).json(contatos)
};

const createContato = async (request, response) => {
    const createdContato = await contatosModel.createContato(request.body);
    return response.status(201).json(createdContato);
};

const updateContato = async (request, response) => {
    const { id_professor } = request.params;
    await contatosModel.updateContato(id_professor, request.body);
    return response.status(204).json();
};

module.exports = {
    getAll,
    createContato,
    updateContato
};