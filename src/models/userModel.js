const connection = require('./connection');

const getAll = async () => {
    const [users] = await connection.execute("SELECT id, nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, CAST(modo_professor AS UNSIGNED) AS modo_professor FROM USUARIOS");
    return users;
};

const createUser = async(user) => {
    const { nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor } = user;

    const query = "INSERT INTO usuarios (nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const [createdUser] = await connection.execute(query, [nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor]);
    return {insertId: createdUser.insertId};
};

module.exports = {
    getAll,
    createUser
};