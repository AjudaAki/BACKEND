const connection = require('./connection');

const getAll = async() => {
    const [horarios] = await connection.execute("Select * from HORARIOS");
    return horarios;
};

const createHorario = async(horario) => {
    const { hora_inicio, hora_fim, dia_semana } = horario;

    const query = "INSERT INTO HORARIOS (hora_inicio, hora_fim, dia_semana) VALUES (?, ?, ?)";

    const [createdHorario] = await connection.execute(query, [hora_inicio, hora_fim, dia_semana]);
    return {insertId: createdHorario.insertId};
};

const deleteHorario = async (id_horario) => {
    const deletedHorario = await connection.execute("DELETE FROM HORARIOS WHERE id_horario = ?", [id_horario]);
    return deletedHorario;
};

const updateHorario = async (id_horario, horario) => {
    const query = "UPDATE HORARIOS SET hora_inicio = ?, hora_fim = ?, dia_semana = ? WHERE id_horario = ?";    

    const { hora_inicio, hora_fim, dia_semana } = horario;

    const updatedHorario = await connection.execute(query, [hora_inicio, hora_fim, dia_semana, id_horario]);
    return updatedHorario; 
};

module.exports = {
    getAll,
    createHorario,
    deleteHorario,
    updateHorario
};