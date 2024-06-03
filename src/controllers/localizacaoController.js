const localizacaoRepository = require('../repositories/localizacaoRepository');

const getAll = async (request, response) => {
    try{
        const localizacao = await localizacaoRepository.getAll();
        return response.status(200).json(localizacao);
    } catch (error) {
        console.error('Erro ao exibir a localização:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const createLocalizacao = async (request, response) => {
    try{
        const {id_usuario, estado, cidade, bairro, rua, numero_casa} = request.body;
        const createdLocalizacao = await localizacaoRepository.createLocalizacao(id_usuario, estado, cidade, bairro, rua, numero_casa);
        return response.status(201).json(createdLocalizacao);
    } catch (error) {
        console.error('Erro ao exibir a localização:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const deleteLocalizacao = async (request, response) => {
    try{
        const {id_usuario} = request.params;
        const result = await localizacaoRepository.deleteLocalizacao(id_usuario);
        return response.status(401).json({ message: 'Localizacao deletada com sucesso'})
    } catch (error) {
        console.error('Erro ao exibir a localização:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const updateLocalizacao = async (request, response) => {
    try{
        const {id_usuario} = request.params;
        await localizacaoRepository.updateLocalizacao(id_usuario, request.body);
        return response.status(200).json({ message: "Localização atualizada com sucesso."})
    } catch (error) {
        console.error('Erro ao exibir a localização:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

module.exports = {
    getAll,
    createLocalizacao,
    deleteLocalizacao,
    updateLocalizacao,
};