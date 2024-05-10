const horariosModel = require('../models/horariosModel');

const getAll = async (request, response) => {
    const horarios = await horariosModel.getAll();
    return response.status(200).json(horarios)
};

const createHorario = async (request, response) => {
    const createdHorario = await horariosModel.createHorario(request.body);
    return response.status(201).json(createdHorario);
};

const deleteHorario = async (request, response) => {
    const { id_horario } = request.params;
    await horariosModel.deleteHorario(id_horario);
    return response.status(204).json();
};

const updateHorario = async (request, response) => {
    const { id_horario } = request.params;
    await horariosModel.updateHorario(id_horario, request.body);
    return response.status(204).json();
};

module.exports = {
    getAll,
    createHorario,
    deleteHorario,
    updateHorario
};