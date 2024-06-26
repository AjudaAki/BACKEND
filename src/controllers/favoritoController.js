const favoritoRepository = require('../repositories/favoritoRepository')

const getAll = async (request, response) => {
    try{
        const usuario_logado = request.userId;
        const favoritos = await favoritoRepository.getAll(usuario_logado);
        return response.status(200).json(favoritos);
    } catch (error) {
        console.error('Erro ao exibir os favoritos:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const createFavorito = async (request, response) => {
    try {
        const usuario_logado = request.userId;
        const { usuario_relacionado } = request.body;

        if (!usuario_relacionado) {
            return response.status(400).json({ message: 'Usuário relacionado é obrigatório' });
        }

        const createdFavorito = await favoritoRepository.createFavorito(usuario_logado, usuario_relacionado);
        return response.status(201).json(createdFavorito);
    } catch (error) {
        console.error('Erro ao adicionar aos favoritos:', error);
        return response.status(500).json({ message: 'Erro interno no servidor' });
    }
};

const deleteFavorito = async (request, response) => {
    try{
        const { usuario_logado, usuario_relacionado } = request.params;
        await favoritoRepository.deleteFavorito({ usuario_logado, usuario_relacionado }).catch(e=>response.status(404).send(e.message))
        return response.status(204).json({ message: 'Avaliação deletada com sucesso! '})
    } catch (error) {
        console.error('Erro ao deletar o favorito:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};


module.exports = {
    getAll,
    createFavorito,
    deleteFavorito,
}