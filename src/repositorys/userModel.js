const connection = require('./connection');
const encryptPassword = require('../auth/encryptPassword');

const getAll = async () => {
    const [users] = await connection.execute("SELECT id, nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, CAST(modo_professor AS UNSIGNED) AS modo_professor FROM USUARIOS");
    return users;
};

/**
 * @param {import('../models/user.model').User} user 
 * @returns 
*/

const createProfessor = async (user) => {
    const { nome, email, senha, telefone, cpf, dataNascimento, descricao, descricao_rapida } = user;

    const query = "INSERT INTO USUARIOS (nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)";

    const hashedPassword = await encryptPassword(senha);

    const [createdProfessor] = await connection.execute(query, [nome, email, hashedPassword, telefone, cpf, dataNascimento, descricao, descricao_rapida]);
    return { insertId: createdProfessor.insertId };
};

/**
 * @param {import('../models/user.model').User} user 
 * @returns 
*/

const createAluno = async (user) => {
    const { nome, email, senha, telefone, cpf, data_nascimento } = user;

    const query = "INSERT INTO USUARIOS (nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor) VALUES (?, ?, ?, ?, ?, ?, '', '', 0)";

    const hashedPassword = await encryptPassword(senha)

    const [createdAluno] = await connection.execute(query, [nome, email, hashedPassword, telefone, cpf, data_nascimento]);
    return { insertId: createdAluno.insertId };
};

/**
 * @param {import('../models/user.model').User} user 
 * @returns 
*/

const deleteUser = async (id) => {
    const deletedUser = await connection.execute("DELETE FROM USUARIOS WHERE id = ?", [id]);
    return deletedUser;
};

/**
 * @param {import('../models/user.model').User} user 
 * @returns 
*/

const updateUser = async (id, user) => {
    const query = "UPDATE USUARIOS SET nome = ?, email = ?, senha = ?, telefone = ?, cpf = ?, data_nascimento = ?, descricao = ?, descricao_rapida = ?, modo_professor = ? WHERE id = ?";

    const { nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor } = user;

    const updatedUser = await connection.execute(query, [nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor, id]);
    return updatedUser;
};

module.exports = {
    getAll,
    createAluno,
    createProfessor,
    deleteUser,
    updateUser
};