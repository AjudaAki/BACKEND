const connection = require('./connection');

const getAll = async () => {
    const [localizacao] = await connection.execute('SELECT * FROM LOCALIZACAO_USUARIO');
    return localizacao;
}

const createLocalizacao = async (id_usuario, estado, cidade, bairro, rua, numero_casa) => {
    const query = "INSERT INTO LOCALIZACAO_USUARIO (id_usuario, estado, cidade, bairro, rua, numero_casa) VALUES (?,?,?,?,?,?)";
    const [createdLocalizacao] = await connection.execute(query, [id_usuario, estado, cidade, bairro, rua, numero_casa]);
    return { message: 'Localização criada com sucesso!'}
}

const deleteLocalizacao = async (id_usuario) => {
    const query = "DELETE FROM LOCALIZACAO_USUARIO WHERE id_usuario = ?";
    await connection.execute(query, [id_usuario]);
    return { message: 'Localização deletada com sucesso!' };
}

const updateLocalizacao = async (id_usuario, LOCALIZACAO_USUARIO) => {
    const { estado, cidade, bairro, rua, numero_casa } = LOCALIZACAO_USUARIO;
    const query = "UPDATE LOCALIZACAO_USUARIO SET estado = ?, cidade = ?, bairro = ?, rua = ?, numero_casa = ? WHERE id_usuario = ?";
    await connection.execute(query, [estado, cidade, bairro, rua, numero_casa, id_usuario]);
    return { message: 'Localização atualizada com sucesso!' };
};

module.exports = {
    getAll,
    createLocalizacao,
    deleteLocalizacao,
    updateLocalizacao,
}