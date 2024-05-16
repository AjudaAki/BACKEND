const { request, response } = require('express');
const favoritoModel = require('../models/favoritoModel')

const getAll = async (request, response) => {
    const favoritos = await favoritoModel.getAll();
    return response.status(200).json(favoritos);
};

const createFavorito = async (request, response) => {
    const { usuario_logado, usuario_relacionado } = request.body;
    const createdFavorito = await favoritoModel.createFavorito(usuario_logado, usuario_relacionado);
    return response.status(201).json(createdFavorito);
};

const deleteFavorito = async (request, response) => {
    const { usuario_logado, usuario_relacionado } = request.params;
    await favoritoModel.deleteFavorito({ usuario_logado, usuario_relacionado }).catch(e=>response.status(404).send(e.massage))
        return response.status(204).json({ message: 'Avaliação deletada com sucesso! '})
}

/*const deleteFavorito = async (request, response) => {
    const {id_favorito} = request.params;
    const result = await favoritoModel.deleteFavorito(id_favorito);
        return response.status(404).json({ message: 'Favorito deletada com sucesso! ' }); 
    
}*/





module.exports = {
    getAll,
    createFavorito,
    deleteFavorito,
}