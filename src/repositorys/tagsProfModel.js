const connection = require('./connection');

const getAll = async (id_usuario) => {
    const [tagsProf] = await connection.execute("SELECT * FROM TAGS_PROFESSOR WHERE id_usuario = ?", [id_usuario]);
    return tagsProf;
}

const createTagProf = async(tagProf) => {
    const { id_usuario, id_tag } = tagProf;

    const query = "INSERT INTO TAGS_PROFESSOR (id_usuario, id_tag) VALUES (?, ?)"

    const [createdTagProf] = await connection.execute(query, [id_usuario, id_tag]);
    return createdTagProf;
};

const deleteTagProf = async (tagProf) => {
    const { id_usuario, id_tag } = tagProf;

    const query = "DELETE FROM TAGS_PROFESSOR WHERE id_usuario = ? AND id_tag = ?";

    const deletedTagProf = await connection.execute(query, [id_usuario, id_tag]);
    return deletedTagProf;
};

module.exports = {
    getAll,
    createTagProf,
    deleteTagProf
};