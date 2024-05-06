const userModel = require('../models/userModel');

const getAll = async (request, response) => {
    const users = await userModel.getAll();
    return response.status(200).json(users)
};

const createUser = async (request, response) => {
    const createdUser = await userModel.createUser(request.body);
    return response.status(201).json(createdUser);
};

module.exports = {
    getAll,
    createUser,
};