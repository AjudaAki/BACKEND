const connection = require('./connection');

const getAll = async () => {
    const [localizacao] = await connection.execute('SELECT * FROM LOCALIZACAO_USUARIO');
    return localizacao;
}

const createLocalizacao = async (id_usuario, estado, cidade, bairro, rua, numero_casa) => {
    const query = "INSERT INTO LOCALIZACAO_USUARIO (id_usuario, estado, cidade, bairro, rua, numero_casa) VALUES (?,?,?,?,?,?)";
    const [createdLocalizacao] = await connection.execute(query, [id_usuario, estado, cidade, bairro, rua, numero_casa]);
    return { message: 'Criou a localizacao ja'}
}

const deleteLocalizacao = async (id_usuario, COMENTARIOS) =>{
    const query = "DELETE FROM LOCALIZACAO_USUARIO WHERE id_usuario = ? ";
    return await connection.execute(query, [id_usuario]);

}

const updateLocalizacao = async (id_usuario, LOCALIZACAO_USUARIO) => {
    const { estado, cidade, bairro, rua, numero_casa } = LOCALIZACAO_USUARIO;
    const query = "UPDATE LOCALIZACAO_USUARIO SET estado = ?, cidade = ?, bairro = ?, rua = ?, numero_casa = ? WHERE id_usuario = ?";
    const updateLocalizacao = await connection.execute(query, [estado, cidade, bairro, rua, numero_casa, id_usuario]);
    return updateLocalizacao;
};

module.exports = {
    getAll,
    createLocalizacao,
    deleteLocalizacao,
    updateLocalizacao,
}