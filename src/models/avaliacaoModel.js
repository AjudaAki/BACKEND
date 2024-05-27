
const connection = require('./connection');

const getAll = async () => {
    const [avaliacao] = await connection.execute('SELECT * FROM AVALIACAO_PROFESSOR');
    return avaliacao;
};

const createAvaliacao = async (usuario_avaliador, professor_avaliado, nota) => {
    const query = "INSERT INTO AVALIACAO_PROFESSOR (usuario_avaliador, professor_avaliado, nota) VALUES (?, ?, ?)";
    const [createdAvaliacao] = await connection.execute(query, [usuario_avaliador, professor_avaliado, nota]);
    return { insertId: createdAvaliacao.insertId };
};

const deleteAvaliacao = async (id_avaliacao_professor) => {
    const query = "DELETE FROM AVALIACAO_PROFESSOR WHERE id_avaliacao_professor = ?";
    return await connection.execute(query, [id_avaliacao_professor]);
};


const updateAvaliacao = async (id_avaliacao_professor, AVALIACAO_PROFESSOR) => {
    const query = "UPDATE AVALIACAO_PROFESSOR SET nota = ? WHERE id_avaliacao_professor = ?";
    const { nota } = AVALIACAO_PROFESSOR;
    const updatedAvaliacao = await connection.execute(query, [nota, id_avaliacao_professor]);
    return updatedAvaliacao;
};

module.exports = {
    getAll,
    createAvaliacao,
    deleteAvaliacao,
    updateAvaliacao,
};