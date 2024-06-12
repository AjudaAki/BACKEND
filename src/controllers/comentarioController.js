const comentarioRepository = require('../repositories/comentarioRepository');

const getAll = async (request, response) => {
    try {
        const { id_perfil } = request.params;

        const comentarios = await comentarioRepository.getAll(id_perfil);
        return response.status(200).json(comentarios); 
    } catch (error) {
        console.error('Erro ao exibir os comentários:', error);
        return response.status(500).json({ message: 'Erro interno no servidor' });
    }
};

const createComentario = async (request, response) => {
    try{
        const {id_usuario, comentario_usuario} = request.body;
        const { id_perfil } = request.params;
        const createdComentario = await comentarioRepository.createComentario(id_usuario, id_perfil, comentario_usuario);
        return response.status(201).json(createdComentario);
    } catch (error) {
        console.error('Erro ao criar o comentário:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

module.exports = {
    getAll,
    createComentario
};