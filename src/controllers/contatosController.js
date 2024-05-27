const contatosRepository = require('../repositorys/contatosRepository');

const getAll = async (request, response) => {
    const contatos = await contatosRepository.getAll(request.params.id_professor);
    return response.status(200).json(contatos)
};

const createContato = async (request, response) => {
    const createdContato = await contatosRepository.createContato(request.body);
    return response.status(201).json(createdContato);
};

const updateContato = async (request, response) => {
    const { id_professor } = request.params;
    await contatosRepository.updateContato(id_professor, request.body);
    return response.status(204).json();
};

module.exports = {
    getAll,
    createContato,
    updateContato
};