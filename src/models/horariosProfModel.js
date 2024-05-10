const connection = require('./connection');

const getAll = async () => {
    const [horariosProf] = await connection.execute("SELECT * FROM HORARIOS_USUARIOS");
    return horariosProf;
}

const createHorariosProf = async(horariosProf) => {
    const { id_usuario, id_horario } = horariosProf;

    const query = "INSERT INTO HORARIOS_USUARIOS (id_usuario, id_horario) VALUES (?, ?)"

    const [createdHorariosProf] = await connection.execute(query, [id_usuario, id_horario]);
    return createdHorariosProf;
};

const deleteHorariosProf = async (horarioProf) => {
    const { id_usuario, id_horario } = horarioProf;

    const query = "DELETE FROM HORARIOS_USUARIOS WHERE id_usuario = ? AND id_horario = ?";

    const deletedHorariosProf = await connection.execute(query, [id_usuario, id_horario]);
    return deletedHorariosProf;
};

module.exports = {
    getAll,
    createHorariosProf,
    deleteHorariosProf
};