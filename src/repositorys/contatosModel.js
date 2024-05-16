const connection = require('./connection');

const getAll = async () => {
    const [contatos] = await connection.execute("SELECT * FROM CONTATOS");
    return contatos;
};

const createContatos = async(contato) => {
    const { id_professor, discord, whatsapp, teams } = contato;

    const query = "INSERT INTO CONTATOS (id_professor, discord, whatsapp, teams) VALUES (?, ?, ?, ?)";

    const [createdContato] = await connection.execute(query, [id_professor, discord, whatsapp, teams]);
    return { message: "Sucesso" };
};

const deleteContato = async (id) => {
    const deletedContato = await connection.execute("DELETE FROM CONTATOS WHERE id_professor = ?", [id_professor]);
    return deletedContato;
};

const updateUser = async (id, user) => {
    const query = "UPDATE USUARIOS SET nome = ?, email = ?, senha = ?, telefone = ?, cpf = ?, data_nascimento = ?, descricao = ?, descricao_rapida = ?, modo_professor = ? WHERE id = ?";    

    const { nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor } = user;

    const updatedUser = await connection.execute(query, [nome, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor, id]);
    return updatedUser; 
};

module.exports = {
    getAll,
    createContatos,
    deletedContato,
    updateUser
};