const userModel = require('../models/userModel');

const getAll = async (request, response) => {
    const users = await userModel.getAll();
    return response.status(200).json(users)
};

const getOneAluno = async (request, response) => {
    const user = await userModel.getOneAluno(request.params.id);
    return response.status(200).json(user)
};

const getOneProf = async (request, response) => {
    const user = await userModel.getOneProf(request.params.id);
    return response.status(200).json(user)
};

const getProfs = async (request, response) => {
    const users = await userModel.getProfs();
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
    getProfs,
    getOneAluno,
    getOneProf,
    createProfessor,
    createAluno,
    deleteUser,
    updateUser
};