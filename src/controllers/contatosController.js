const contatosRepository = require('../repositories/contatosRepository');

const getAll = async (request, response) => {
    try{
        const contatos = await contatosRepository.getAll(request.params.id_professor);
        return response.status(200).json(contatos)
    } catch (error) {
        console.error('Erro ao exibir os contatos:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const createContato = async (request, response) => {
    try{
        const createdContato = await contatosRepository.createContato(request.body);
        return response.status(201).json(createdContato);
    } catch (error) {
        console.error('Erro ao criar os contatos:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const updateContato = async (request, response) => {
    try{
        const { id_professor } = request.params;
        await contatosRepository.updateContato(id_professor, request.body);
        return response.status(204).json();
    } catch (error) {
        console.error('Erro ao atualizar os contatos:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

module.exports = {
    getAll,
    createContato,
    updateContato
};