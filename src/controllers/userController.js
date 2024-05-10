const userModel = require('../models/userModel');

const getAll = async (request, response) => {
    const users = await userModel.getAll();
    return response.status(200).json(users)
};

const createAluno = async (request, response) => {
    const createdAluno = await userModel.createAluno(request.body);
    return response.status(201).json(createdAluno);
};

const createProfessor = async (request, response) => {
    const createdProfessor = await userModel.createProfessor(request.body);
    return response.status(201).json(createdProfessor);
};

const deleteUser = async (request, response) => {
    const { id } = request.params;
    await userModel.deleteUser(id);
    return response.status(204).json()
};

const updateUser = async (request, response) => {
    const { id } = request.params;
    await userModel.updateUser(id, request.body);
    return response.status(204).json();
};

module.exports = {
    getAll,
    createProfessor,
    createAluno,
    deleteUser,
    updateUser
};