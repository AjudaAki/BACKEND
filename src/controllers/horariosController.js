<<<<<<< HEAD
const horariosRepository = require('../repositorys/horariosRepository');
=======
const horariosModel = require('../models/horariosModel');
>>>>>>> 0513d43a9cad092f9a262239bc99c5713f7773e7

const getAll = async (request, response) => {
    const horarios = await horariosRepository.getAll();
    return response.status(200).json(horarios)
};

const createHorario = async (request, response) => {
    const createdHorario = await horariosRepository.createHorario(request.body);
    return response.status(201).json(createdHorario);
};

const deleteHorario = async (request, response) => {
    const { id_horario } = request.params;
    await horariosRepository.deleteHorario(id_horario);
    return response.status(204).json();
};

const updateHorario = async (request, response) => {
    const { id_horario } = request.params;
    await horariosRepository.updateHorario(id_horario, request.body);
    return response.status(204).json();
};

module.exports = {
    getAll,
    createHorario,
    deleteHorario,
    updateHorario
};