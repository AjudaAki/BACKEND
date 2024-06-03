const avaliacaoRepository = require('../repositories/avaliacaoRepository');

const getAll = async (request, response) => {
    try{
        const avaliacoes = await avaliacaoRepository.getAll();
        return response.status(200).json(avaliacoes); 
    } catch (error) {
        console.error('Erro ao exibir as avaliações:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const createAvaliacao = async (request, response) => {
    try{
        const { usuario_avaliador, professor_avaliado, nota } = request.body;
        const createdAvaliacao = await avaliacaoRepository.createAvaliacao(usuario_avaliador, professor_avaliado, nota);
        return response.status(201).json(createdAvaliacao);
    } catch (error) {
        console.error('Erro ao criar a avaliação:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

// const deleteAvaliacao = async (request, response) => {
//     try{
//         const { id_avaliacao_professor } = request.params; 
//         const result = await avaliacaoRepository.deleteAvaliacao(id_avaliacao_professor);
//         return response.status(404).json({ message: 'Avaliação deletada com sucesso! ' }); 
//     } catch (error) {
//         console.error('Erro ao deletar a avaliação:', error)
//         return response.status(500).json({ message: 'Erro interno no servidor'})
//     };
// };

// const updateAvaliacao = async (request, response) => {
//     try{
//         const { id_avaliacao_professor } = request.params;
//         await avaliacaoRepository.updateAvaliacao(id_avaliacao_professor, request.body);
//         return response.status(200).json({ message: 'Atualização realizada com sucesso!' });
//     } catch (error) {
//         console.error('Erro ao atualizar as avaliações:', error)
//         return response.status(500).json({ message: 'Erro interno no servidor'})
//     };
// };

module.exports = {
    getAll,
    createAvaliacao,
};