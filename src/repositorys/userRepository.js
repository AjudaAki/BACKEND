const connection = require('./connection');
const {encryptPassword} = require('../auth/encryptPassword'); 
const moment = require('moment')

const getAll = async () => {
    const [users] = await connection.execute("SELECT id, nome, email, senha, telefone, cpf, descricao, descricao_rapida, CAST(modo_professor AS UNSIGNED) AS modo_professor FROM USUARIOS");
    for (const user of users) {
        user.data_nascimento_formatada = moment(user.data_nascimento).format('DD/MM/YYYY');
      }
    return users;
};

const getOneProf = async (id) => {
    query = "SELECT u.id, u.nome, u.email, u.senha, u.telefone, u.cpf, u.data_nascimento, u.descricao, u.descricao_rapida, c.discord, c.whatsapp, c.teams, h.hora_inicio, h.hora_fim, h.dia_semana, p.preco_minimo, p.preco_maximo, l.estado, l.cidade, l.bairro, l.rua, l.numero_casa FROM USUARIOS u INNER JOIN CONTATOS c ON u.id = c.id_professor INNER JOIN HORARIOS h ON u.id = h.id_usuario INNER JOIN PRECO_PROFESSOR p ON u.id = p.id_professor INNER JOIN LOCALIZACAO_USUARIO l ON u.id = l.id_usuario WHERE id = ?";

    const [users] = await connection.execute(query, [id]);
    for (const user of users) {
        user.data_nascimento_formatada = moment(user.data_nascimento).format('DD/MM/YYYY');
      }
    return users;
};

const getOneAluno = async (id) => {
    const [users] = await connection.execute("SELECT id, nome, email, senha, telefone, cpf, descricao, descricao_rapida, CAST(modo_professor AS UNSIGNED) AS modo_professor FROM USUARIOS WHERE id = ?", [id]);
    for (const user of users) {
        user.data_nascimento_formatada = moment(user.data_nascimento).format('DD/MM/YYYY');
    }
    return users;
};

const getProfs = async () => {
    query = "SELECT u.id, u.nome, u.email, u.senha, u.telefone, u.cpf, u.data_nascimento, u.descricao, u.descricao_rapida, c.discord, c.whatsapp, c.teams, h.hora_inicio, h.hora_fim, h.dia_semana, p.preco_minimo, p.preco_maximo, l.estado, l.cidade, l.bairro, l.rua, l.numero_casa FROM USUARIOS u INNER JOIN CONTATOS c ON u.id = c.id_professor INNER JOIN HORARIOS h ON u.id = h.id_usuario INNER JOIN PRECO_PROFESSOR p ON u.id = p.id_professor INNER JOIN LOCALIZACAO_USUARIO l ON u.id = l.id_usuario";

    const [users] = await connection.execute(query);
    for (const user of users) {
        user.data_nascimento_formatada = moment(user.data_nascimento).format('DD/MM/YYYY');
      }
    return users;
};

const createProfessor = async(user) => {
    const { nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida } = user;

    const query = "INSERT INTO USUARIOS (nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)";

    const hashedPassword = await encryptPassword(senha);

    const [createdProfessor] = await connection.execute(query, [nome, email, hashedPassword, telefone, cpf, data_nascimento, descricao, descricao_rapida]);
    return {insertId: createdProfessor.insertId};
};

const createAluno = async(user) => {
    const { nome, email, senha, telefone, cpf, data_nascimento } = user;

    const query = "INSERT INTO USUARIOS (nome, email, senha, telefone, cpf, data_nascimento, modo_professor) VALUES (?, ?, ?, ?, ?, ?, 0)";

    const hashedPassword = await encryptPassword(senha)

    const [createdAluno] = await connection.execute(query, [nome, email, hashedPassword, telefone, cpf, data_nascimento]);
    return {insertId: createdAluno.insertId};
};

const updateUser = async (id, user) => {
    const query = "UPDATE USUARIOS SET nome = ?, email = ?, senha = ?, telefone = ?, cpf = ?, data_nascimento = ?, descricao = ?, descricao_rapida = ?, modo_professor = ? WHERE id = ?";    

    const { nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor } = user;

    const updatedUser = await connection.execute(query, [nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor, id]);
    return updatedUser; 
};

module.exports = {
    getAll,
    getProfs,
    getOneAluno,
    getOneProf,
    createAluno,
    createProfessor,
    updateUser
};