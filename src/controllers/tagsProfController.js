const tagsProfRepository = require('../repositories/tagsProfRepository');

const getAll = async (request, response) => {
    const tagsProf = await tagsProfRepository.getAll(request.params.id_usuario);
    return response.status(200).json(tagsProf)
};

const createTagProf = async (request, response) => {
    try {
        const createdTagProf = await tagsProfRepository.createTagProf(request.body);
        return response.status(201).json({ message: 'Sucesso' });
    } catch (error) {
        console.error('Erro ao criar tag para o professor:', error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const deleteTagProf = async (request, response) => {
    const { id_usuario, id_tag } = request.params;
    await tagsProfRepository.deleteTagProf({ id_usuario, id_tag });
    return response.status(204).json();
};

module.exports = {
    getAll,
    createTagProf,
    deleteTagProf
};