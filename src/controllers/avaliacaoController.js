<<<<<<< HEAD
const avaliacaoRepository = require('../repositorys/avaliacaoRepository');
=======
const avaliacaoModel = require('../models/avaliacaoModel');
>>>>>>> 0513d43a9cad092f9a262239bc99c5713f7773e7

const getAll = async (request, response) => {
    const avaliacoes = await avaliacaoRepository.getAll();
    return response.status(200).json(avaliacoes);
};

const createAvaliacao = async (request, response) => {
    const { usuario_avaliador, professor_avaliado, nota } = request.body;
    const createdAvaliacao = await avaliacaoRepository.createAvaliacao(usuario_avaliador, professor_avaliado, nota);
    return response.status(201).json(createdAvaliacao);
};

const deleteAvaliacao = async (request, response) => {
    const { id_avaliacao_professor } = request.params; 
    const result = await avaliacaoRepository.deleteAvaliacao(id_avaliacao_professor);
        return response.status(404).json({ message: 'Avaliação deletada com sucesso! ' }); 
};

const updateAvaliacao = async (request, response) => {
    const { id_avaliacao_professor } = request.params;
    await avaliacaoRepository.updateAvaliacao(id_avaliacao_professor, request.body);
    return response.status(200).json({ message: 'Atualização realizada com sucesso!' });
};

module.exports = {
    getAll,
    createAvaliacao,
    deleteAvaliacao, 
    updateAvaliacao,
};