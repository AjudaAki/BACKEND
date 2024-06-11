const connection = require('./connection');
const { Horarios } = require('../models/horariosModel');

const getAll = async() => {
    const [horarios] = await connection.execute("Select * from HORARIOS");
    return horarios;
};

const createHorario = async(horario) => {
    const { id_usuario, domingo, segunda, terca, quarta, quinta, sexta, sabado } = horario;

    const query = "INSERT INTO HORARIOS (id_usuario, domingo, segunda, terca, quarta, quinta, sexta, sabado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    const [createdHorario] = await connection.execute(query, [id_usuario, domingo, segunda, terca, quarta, quinta, sexta, sabado]);
    return {insertId: createdHorario.insertId};
};

// const deleteHorario = async (id_usuario, dia_semana) => {
//     const deletedHorario = await connection.execute("DELETE FROM HORARIOS WHERE id_usuario = ? AND dia_semana = ?", [id_usuario, dia_semana]);
//     return deletedHorario;
// };

const updateHorario = async (id_usuario, horario) => {
    const { domingo, segunda, terca, quarta, quinta, sexta, sabado } = horario;

    const query = "UPDATE HORARIOS SET domingo = ?, segunda = ?, terca = ?, quarta = ?, quinta = ?, sexta = ?, sabado = ? WHERE id_usuario = ?";

    const [result] = await connection.execute(query, [domingo, segunda, terca, quarta, quinta, sexta, sabado, id_usuario]);

    return result; 
};


module.exports = {
    getAll,
    createHorario,
    updateHorario
};