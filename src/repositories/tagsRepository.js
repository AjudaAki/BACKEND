const connection = require('./connection');
const { Tags } = require('../models/tagsModel');

const getAll = async() => {
    const [tags] = await connection.execute("Select * from TAGS");
    return tags;
};

const createTag = async(tag) => {
    const { nome_tag } = tag;

    const query = "INSERT INTO TAGS (nome_tag) VALUES (?)";

    const [createdTag] = await connection.execute(query, [nome_tag]);
    return {insertId: createdTag.insertId};
};

const deleteTag = async (id_tag) => {
    const deletedTag = await connection.execute("DELETE FROM TAGS WHERE id_tag = ?", [id_tag]);
    return deletedTag;
};

const updateTag = async (id_tag, tag) => {
    const query = "UPDATE TAGS SET nome_tag = ? WHERE id_tag = ?";    

    const { nome_tag } = tag;

    const updatedTags = await connection.execute(query, [nome_tag, id_tag]);
    return updatedTags; 
};

module.exports = {
    getAll,
    createTag,
    deleteTag,
    updateTag
};