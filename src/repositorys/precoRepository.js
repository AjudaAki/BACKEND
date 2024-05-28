const connection = require('./connection');

const getAll = async () => {
    const [preco] = await connection.execute('SELECT * FROM PRECO_PROFESSOR');
    return preco;
};

const createPreco = async (id_professor, preco_minimo, preco_maximo) => {
    const query = "INSERT INTO PRECO_PROFESSOR (id_professor, preco_minimo, preco_maximo) VALUES (?,?,?)";
    const [createdPreco] = await connection.execute(query, [id_professor, preco_minimo, preco_maximo]);
    return { message: 'Criou o bagulhp'}
};

const deletePreco = async (id_professor) => {
    const query = "DELETE FROM PRECO_PROFESSOR WHERE id_professor = ?";
    return await connection.execute(query, [id_professor]);
};

const updatePreco = async (id_professor, PRECO_PROFESSOR) => {
    const { preco_minimo, preco_maximo } = PRECO_PROFESSOR;
    const query = "UPDATE PRECO_PROFESSOR SET preco_minimo = ?, preco_maximo = ? WHERE id_professor = ?";
    const updatePreco = await connection.execute(query, [preco_minimo, preco_maximo, id_professor]);
    return updatePreco;
};

module.exports = {
    getAll,
    createPreco,
    deletePreco,
    updatePreco,
};