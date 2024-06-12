const connection = require('./connection');
const {encryptPassword} = require('../auth/encryptPassword'); 
const moment = require('moment')
const { User } = require('../models/userModel');

const getAll = async () => {
    const [users] = await connection.execute("SELECT id, nome, email, senha, telefone, cpf, descricao, descricao_rapida, img_perfil, CAST(modo_professor AS UNSIGNED) AS modo_professor FROM USUARIOS");
    for (const user of users) {
        user.data_nascimento_formatada = moment(user.data_nascimento).format('DD/MM/YYYY');
      }
    return users;
};

const getOneProf = async (id) => {
    const query = "SELECT u.id, u.nome, u.email, u.senha, u.telefone, u.cpf, u.data_nascimento, u.descricao, u.descricao_rapida, u.img_perfil, CAST(u.modo_professor AS UNSIGNED) AS modo_professor, COUNT(DISTINCT f.usuario_relacionado) AS favoritos, c.discord, c.whatsapp, c.teams, h.domingo, h.segunda, h.terca, h.quarta, h.quinta, h.sexta, h.sabado, p.preco_minimo, p.preco_maximo, l.estado, l.cidade, l.bairro, l.rua, l.numero_casa FROM USUARIOS u INNER JOIN CONTATOS c ON u.id = c.id_professor INNER JOIN HORARIOS h ON u.id = h.id_usuario INNER JOIN PRECO_PROFESSOR p ON u.id = p.id_professor LEFT JOIN FAVORITOS f ON u.id = f.usuario_logado INNER JOIN LOCALIZACAO_USUARIO l ON u.id = l.id_usuario WHERE u.id = ? GROUP BY u.id, u.nome, u.email, u.senha, u.telefone, u.cpf, u.data_nascimento, u.descricao, u.descricao_rapida, u.img_perfil, u.modo_professor, c.discord, c.whatsapp, c.teams, h.domingo, h.segunda, h.terca, h.quarta, h.quinta, h.sexta, h.sabado, p.preco_minimo, p.preco_maximo, l.estado, l.cidade, l.bairro, l.rua, l.numero_casa";

    const [users] = await connection.execute(query, [id]);
    for (const user of users) {
        user.data_nascimento_formatada = moment(user.data_nascimento).format('DD/MM/YYYY');
    }
    return users[0];
};

const getOneAluno = async (id) => {
    const [users] = await connection.execute("SELECT id, nome, email, senha, telefone, cpf, descricao, descricao_rapida, u.img_perfil, CAST(modo_professor AS UNSIGNED) AS modo_professor FROM USUARIOS WHERE id = ?", [id]);
    for (const user of users) {
        user.data_nascimento_formatada = moment(user.data_nascimento).format('DD/MM/YYYY');
    }
    return users;
};

const getAlunoLog = async (id) => {
    const [users] = await connection.execute(
        `SELECT u.id, u.nome, u.email, u.senha, u.telefone, u.cpf, u.data_nascimento, u.descricao, u.descricao_rapida, u.img_perfil, CAST(u.modo_professor AS UNSIGNED) AS modo_professor, COUNT(DISTINCT f.usuario_relacionado) AS favoritos, l.estado, l.cidade, l.bairro, l.rua, l.numero_casa FROM USUARIOS u LEFT JOIN FAVORITOS f ON u.id = f.usuario_logado LEFT JOIN LOCALIZACAO_USUARIO l ON u.id = l.id_usuario WHERE u.id = ? GROUP BY u.id, u.nome, u.email, u.senha, u.telefone, u.cpf, u.data_nascimento, u.descricao, u.descricao_rapida, u.img_perfil, u.modo_professor, l.estado, l.cidade, l.bairro, l.rua, l.numero_casa`, 
        [id]
    );

    for (const user of users) {
        user.data_nascimento_formatada = moment(user.data_nascimento).format('DD/MM/YYYY');
    }
    return users;
};


const getProfs = async () => {
    const query = "SELECT u.id, u.nome, u.email, u.senha, u.telefone, u.cpf, u.data_nascimento, u.descricao, u.descricao_rapida, u.img_perfil, CAST(u.modo_professor AS UNSIGNED) AS modo_professor, COUNT(DISTINCT f.usuario_relacionado) AS favoritos, c.discord, c.whatsapp, c.teams, h.domingo, h.segunda, h.terca, h.quarta, h.quinta, h.sexta, h.sabado, p.preco_minimo, p.preco_maximo, l.estado, l.cidade, l.bairro, l.rua, l.numero_casa FROM USUARIOS u INNER JOIN CONTATOS c ON u.id = c.id_professor INNER JOIN HORARIOS h ON u.id = h.id_usuario LEFT JOIN FAVORITOS f ON u.id = f.usuario_logado INNER JOIN PRECO_PROFESSOR p ON u.id = p.id_professor INNER JOIN LOCALIZACAO_USUARIO l ON u.id = l.id_usuario GROUP BY u.id, u.nome, u.email, u.senha, u.telefone, u.cpf, u.data_nascimento, u.descricao, u.descricao_rapida, u.img_perfil, u.modo_professor, c.discord, c.whatsapp, c.teams, h.domingo, h.segunda, h.terca, h.quarta, h.quinta, h.sexta, h.sabado, p.preco_minimo, p.preco_maximo, l.estado, l.cidade, l.bairro, l.rua, l.numero_casa";

    const [users] = await connection.execute(query);
    for (const user of users) {
        user.data_nascimento_formatada = moment(user.data_nascimento).format('DD/MM/YYYY');
    }
    return users;
};

const getProfessoresCard = async () => {
    const query = "SELECT u.id, u.nome, u.descricao_rapida, u.img_perfil, CAST(u.modo_professor AS UNSIGNED) AS modo_professor, t.nome_tag FROM USUARIOS u INNER JOIN TAGS_PROFESSOR tp ON u.id = tp.id_usuario INNER JOIN TAGS t ON tp.id_tag = t.id WHERE u.modo_professor = 1";
    const [users] = await connection.execute(query);
    return users;
};

const getIMG = async (id) => {
    const query = "SELECT img_perfil FROM USUARIOS WHERE id = ?";
    const [img] = await connection.execute(query, [id]);
    return img;
};

const createProfessor = async(user) => {
    const { nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, img_perfil } = user;

    const query = "INSERT INTO USUARIOS (nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, img_perfil, modo_professor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)";

    const hashedPassword = await encryptPassword(senha);

    const [createdProfessor] = await connection.execute(query, [nome, email, hashedPassword, telefone, cpf, data_nascimento, descricao, descricao_rapida, img_perfil]);
    return {insertId: createdProfessor.insertId};
};

const createAluno = async(user) => {
    const { nome, email, senha, telefone, cpf, data_nascimento, img_perfil } = user;

    const query = "INSERT INTO USUARIOS (nome, email, senha, telefone, cpf, data_nascimento, img_perfil, modo_professor) VALUES (?, ?, ?, ?, ?, ?, ?, 0)";

    const hashedPassword = await encryptPassword(senha)

    const [createdAluno] = await connection.execute(query, [nome, email, hashedPassword, telefone, cpf, data_nascimento, img_perfil]);
    return {insertId: createdAluno.insertId};
};

const updateUser = async (id, user) => {
    const query = "UPDATE USUARIOS SET nome = ?, email = ?, senha = ?, telefone = ?, cpf = ?, data_nascimento = ?, descricao = ?, descricao_rapida = ?, modo_professor = ? WHERE id = ?";    

    const { nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor } = user;

    const updatedUser = await connection.execute(query, [nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor, id]);
    return updatedUser; 
};

const createProfAll = async(user) => {
    const { nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, img_perfil, discord, whatsapp, teams, domingo, segunda, terca, quarta, quinta, sexta, sabado, preco_minimo, preco_maximo, estado, cidade, bairro, rua, numero_casa, id_tag} = user;

    const query = "CALL createProfessor(?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"

    const hashedPassword = await encryptPassword(senha);

    const [createdProfessor] = await connection.execute(query, [ nome, email, hashedPassword, telefone, cpf, data_nascimento, descricao, descricao_rapida, img_perfil, discord, whatsapp, teams, domingo, segunda, terca, quarta, quinta, sexta, sabado, preco_minimo, preco_maximo, estado, cidade, bairro, rua, numero_casa, id_tag]);
    return {insertId: createdProfessor.insertId};
}

module.exports = {
    getAll,
    getProfs,
    getOneAluno,
    getOneProf,
    getAlunoLog,
    getIMG,
    createAluno,
    createProfessor,
    updateUser,
    createProfAll,
    getProfessoresCard
};