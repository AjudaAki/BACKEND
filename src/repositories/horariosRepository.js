const connection = require('./connection');
const { Horarios } = require('../models/horariosModel');

const getAll = async() => {
    const [horarios] = await connection.execute("Select * from HORARIOS");
    return horarios;
};

const createHorario = async(horario) => {
    const { id_usuario, hora_inicio, hora_fim, dia_semana } = horario;

    const query = "INSERT INTO HORARIOS (id_usuario, hora_inicio, hora_fim, dia_semana) VALUES (?, ?, ?, ?)";

    const [createdHorario] = await connection.execute(query, [id_usuario, hora_inicio, hora_fim, dia_semana]);
    return {insertId: createdHorario.insertId};
};

const deleteHorario = async (id_usuario, dia_semana) => {
    const deletedHorario = await connection.execute("DELETE FROM HORARIOS WHERE id_usuario = ? AND dia_semana = ?", [id_usuario, dia_semana]);
    return deletedHorario;
};

const updateHorario = async (id_usuario, dia_semana, horario) => {
    const { hora_inicio, hora_fim } = horario;

    const query = "UPDATE HORARIOS SET hora_inicio = ?, hora_fim = ? WHERE id_usuario = ? AND dia_semana = ?";

    const [result] = await connection.execute(query, [hora_inicio, hora_fim, id_usuario, dia_semana]);

    return result; 
};


module.exports = {
    getAll,
    createHorario,
    deleteHorario,
    updateHorario
};