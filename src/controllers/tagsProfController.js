const tagsProfModel = require('../models/tagsProfModel');

const getAll = async (request, response) => {
    const tagsProf = await tagsProfModel.getAll();
    return response.status(200).json(tagsProf)
};

const createTagProf = async (request, response) => {
    const createdTagProf = await tagsProfModel.createTagProf(request.body);
    return response.status(201).json({ message: 'Sucesso' });
};

const deleteTagProf = async (request, response) => {
    const { id_usuario, id_tag } = request.params;
    await tagsProfModel.deleteTagProf({ id_usuario, id_tag });
    return response.status(204).json();
};

module.exports = {
    getAll,
    createTagProf,
    deleteTagProf
};