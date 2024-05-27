const userRepository = require('../repositorys/userRepository');

const getAll = async (request, response) => {
    const users = await userRepository.getAll();
    return response.status(200).json(users)
};

const getOneAluno = async (request, response) => {
    const user = await userRepository.getOneAluno(request.params.id);
    return response.status(200).json(user)
};

const getOneProf = async (request, response) => {
    const user = await userRepository.getOneProf(request.params.id);
    return response.status(200).json(user)
};

const getProfs = async (request, response) => {
    const users = await userRepository.getProfs();
    return response.status(200).json(users)
};

const createAluno = async (request, response) => {
    const createdAluno = await userRepository.createAluno(request.body);
    return response.status(201).json(createdAluno);
};

const createProfessor = async (request, response) => {
    const createdProfessor = await userRepository.createProfessor(request.body);
    return response.status(201).json(createdProfessor);
};

const deleteUser = async (request, response) => {
    const { id } = request.params;
    await userRepository.deleteUser(id);
    return response.status(204).json()
};

const updateUser = async (request, response) => {
    const { id } = request.params;
    await userRepository.updateUser(id, request.body);
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