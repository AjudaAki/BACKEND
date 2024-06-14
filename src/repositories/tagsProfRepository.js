const connection = require('./connection');
const { TagsProf } = require('../models/tagsProfModel');

const getAll = async (id_usuario) => {
    const query = "SELECT tp.id_usuario,tp.id_tag,t.nome_tag FROM TAGS_PROFESSOR tp INNER JOIN TAGS t ON tp.id_tag = t.id WHERE tp.id_usuario = ?";
    const [tagsProf] = await connection.execute(query, [id_usuario]);
    return tagsProf;
};

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