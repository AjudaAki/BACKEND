const tagsRepository = require('../repositories/tagsRepository');

const getAll = async (request, response) => {
    try{
        const tags = await tagsRepository.getAll();
        return response.status(200).json(tags)
    } catch (error) {
        console.error('Erro ao exibir as tags:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const createTag = async (request, response) => {
    try{
        const createdTag = await tagsRepository.createTag(request.body);
        return response.status(201).json(createdTag);
    } catch (error) {
        console.error('Erro ao criar tag:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const deleteTag = async (request, response) => {
    try{
        const { id_tag } = request.params;
        await tagsRepository.deleteTag(id_tag);
        return response.status(204).json()
    } catch (error) {
        console.error('Erro ao deletar tag:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const updateTag = async (request, response) => {
    try{
        const { id_tag } = request.params;
        await tagsRepository.updateTag(id_tag, request.body);
        return response.status(204).json();
    } catch (error){
        console.error('Erro ao atualizar tag:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

module.exports = {
    getAll,
    createTag,
    deleteTag,
    updateTag
};