const avaliacaoModel = require('../repositorys/avaliacaoModel');

const getAll = async (request, response) => {
    const avaliacoes = await avaliacaoModel.getAll();
    return response.status(200).json(avaliacoes);
};

const createAvaliacao = async (request, response) => {
    const {notaNumber} = request.notaNumber
    const { usuario_avaliador, professor_avaliado } = request.body;
    const createdAvaliacao = await avaliacaoModel.createAvaliacao(usuario_avaliador, professor_avaliado, notaNumber);
    return response.status(201).json(createdAvaliacao);
};

const deleteAvaliacao = async (request, response) => {
    const { id_avaliacao_professor } = request.params; 
    const result = await avaliacaoModel.deleteAvaliacao(id_avaliacao_professor);
        return response.status(404).json({ message: 'Avaliação deletada com sucesso! ' }); 
};


const updateAvaliacao = async (request, response) => {
    const { id_avaliacao_professor } = request.params;
    await avaliacaoModel.updateAvaliacao(id_avaliacao_professor, request.body);
    return response.status(200).json({ message: 'Atualização realizada com sucesso!' });
};

module.exports = {
    getAll,
    createAvaliacao,
    deleteAvaliacao, 
    updateAvaliacao,
};