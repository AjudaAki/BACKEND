const comentarioRepository = require('../repositories/comentarioRepository');

const getAll = async (request, response) => {
    try{
        const comentarios = await comentarioRepository.getAll();
        return response.status(200).json(comentarios); 
    } catch (error) {
        console.error('Erro ao exibir os comentários:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const createComentario = async (request, response) => {
    try{
        const {id_usuario, id_perfil, comentario_usuario} = request.body;
        const createdComentario = await comentarioRepository.createComentario(id_usuario, id_perfil, comentario_usuario);
        return response.status(201).json(createdComentario);
    } catch (error) {
        console.error('Erro ao criar o comentário:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const getComentarioNoPerfil = async (request, response) => {
    try {
        const { comentario_usuario } = request.params;
        const comentarios = await getComentariosNoPerfil(profileId);
        if (comentarios.length === 0) {
            return response.status(404).json({ message: 'Nenhum comentário encontrado para este perfil.' });
        }
        return response.status(200).json(comentarios);
    } catch (error) {
        console.error('Erro ao exibir os comentários:', error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    }
};
module.exports = {
    getAll,
    createComentario,
    getComentarioNoPerfil
};
