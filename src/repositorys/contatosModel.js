const connection = require('./connection');

const getAll = async(id_professor) => {
    const [contatos] = await connection.execute("SELECT * FROM CONTATOS WHERE id_professor = ?", [id_professor]);
    return contatos;
};

const createContato = async(contato) => {
    const { id_professor, discord, whatsapp, teams } = contato;

    const query = "INSERT INTO CONTATOS (id_professor, discord, whatsapp, teams) VALUES (?, ?, ?, ?)";

    const [createdContato] = await connection.execute(query, [id_professor, discord, whatsapp, teams]);
    return {message: "Sucesso"};
};

const updateContato = async (id_professor, contato) => {
    const query = "UPDATE CONTATOS SET discord = ?, whatsapp = ?, teams = ? WHERE id_professor = ?";    

    const { discord, whatsapp, teams } = contato;

    const updatedContatos = await connection.execute(query, [discord, whatsapp, teams, id_professor]);
    return updatedContatos; 
};

module.exports = {
    getAll,
    createContato,
    updateContato
};