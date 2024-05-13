const connection = require('../models/connection');

const tagProfEmUso = async (request, response, next) => {
    const { id_usuario, id_tag } = request.body;

    const [tag] = await connection.execute('SELECT * FROM TAGS_PROFESSOR WHERE id_usuario = ? AND id_tag = ?', [id_usuario, id_tag]);
    if (tag.length > 0) {
        return response.status(401).json({ message: 'Esse professor já possui esta tag' });
    }
        
    next();
};

module.exports = {
    tagProfEmUso
}