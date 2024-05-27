const tagsModel = require('../models/tagsModel');

const getAll = async (request, response) => {
    const tags = await tagsModel.getAll();
    return response.status(200).json(tags)
};

const createTag = async (request, response) => {
    const createdTag = await tagsModel.createTag(request.body);
    return response.status(201).json(createdTag);
};

const deleteTag = async (request, response) => {
    const { id_tag } = request.params;
    await tagsModel.deleteTag(id_tag);
    return response.status(204).json()
};

const updateTag = async (request, response) => {
    const { id_tag } = request.params;
    await tagsModel.updateTag(id_tag, request.body);
    return response.status(204).json();
};

module.exports = {
    getAll,
    createTag,
    deleteTag,
    updateTag
};