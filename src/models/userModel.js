const connection = require('./connection');

const getAll = async() => {
    const [users] = await connection.execute("Select * from usuarios");
    return users;
};

const createUser = async(user) => {
    const { nome, email, senha } = user;

    const query = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

    const [createdUser] = await connection.execute(query, [nome, email, senha]);
    return {insertId: createdUser.insertId};
};

module.exports = {
    getAll,
    createUser
};