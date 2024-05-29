const connection = require('./connection');

const getAll = async () => {
    const [preco] = await connection.execute('SELECT * FROM PRECO_PROFESSOR');
    return preco;
};

const createPreco = async (id_professor, preco_minimo, preco_maximo) => {
    const query = "INSERT INTO PRECO_PROFESSOR (id_professor, preco_minimo, preco_maximo) VALUES (?,?,?)";
    const [createdPreco] = await connection.execute(query, [id_professor, preco_minimo, preco_maximo]);
    return { message: 'Criação de preço concluída.'}
}

const deletePreco = async (id_professor) => {
    const query = "DELETE FROM PRECO_PROFESSOR WHERE id_professor = ?";
    await connection.execute(query, [id_professor]);
    return { message: 'Preço deletado com sucesso.' };
};

const updatePreco = async (id_professor, PRECO_PROFESSOR) => {
    const { preco_minimo, preco_maximo } = PRECO_PROFESSOR;
    const query = "UPDATE PRECO_PROFESSOR SET preco_minimo = ?, preco_maximo = ? WHERE id_professor = ?";
    await connection.execute(query, [preco_minimo, preco_maximo, id_professor]);
    return { message: 'Preço atualizado com sucesso.' };
};

module.exports = {
    getAll,
    createPreco,
    deletePreco,
    updatePreco,
};