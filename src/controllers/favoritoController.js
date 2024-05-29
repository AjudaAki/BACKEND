const { request, response } = require('express');

const favoritoRepository = require('../repositories/favoritoRepository')

const getAll = async (request, response) => {
    const favoritos = await favoritoRepository.getAll();
    return response.status(200).json(favoritos);
};

const createFavorito = async (request, response) => {
    const { usuario_logado, usuario_relacionado } = request.body;
    const createdFavorito = await favoritoRepository.createFavorito(usuario_logado, usuario_relacionado);
    return response.status(201).json(createdFavorito);
};

const deleteFavorito = async (request, response) => {
    const { usuario_logado, usuario_relacionado } = request.params;
    await favoritoRepository.deleteFavorito({ usuario_logado, usuario_relacionado }).catch(e=>response.status(404).send(e.massage))
        return response.status(204).json({ message: 'Avaliação deletada com sucesso! '})
}


module.exports = {
    getAll,
    createFavorito,
    deleteFavorito,
}