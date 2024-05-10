const horariosProfModel = require('../models/horariosProfModel');

const getAll = async (request, response) => {
    const horariosProf = await horariosProfModel.getAll();
    return response.status(200).json(horariosProf)
};

const createHorariosProf = async (request, response) => {
    const createdHorariosProf = await horariosProfModel.createHorariosProf(request.body);
    return response.status(201).json({ message: 'Sucesso' });
};

const deleteHorariosProf = async (request, response) => {
    const { id_usuario, id_horario } = request.params;
    await horariosProfModel.deleteHorariosProf({ id_usuario, id_horario });
    return response.status(204).json();
};

module.exports = {
    getAll,
    createHorariosProf,
    deleteHorariosProf
};