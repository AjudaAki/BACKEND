const precoRepository = require('../repositories/precoRepository');

const getAll = async (request, response) => {
    try{
        const precos = await precoRepository.getAll();
        return response.status(200).json(precos); 
    } catch (error) {
        console.error('Erro ao exibir o preço:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    }
};

const createPreco = async (request, response) => {
    try{
        const {id_professor, preco_minimo, preco_maximo} = request.body;
        const createdPreco = await precoRepository.createPreco(id_professor, preco_minimo, preco_maximo);
        return response.status(201).json(createdPreco);
    } catch (error) {
        console.error('Erro ao criar preço:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const deletePreco = async (request, response) => {
    try{
        const {id_professor} = request.params;
        const result = await precoRepository.deletePreco(id_professor);
        return response.status(404).json({ message: 'Preços deletados com sucesso! '})
    } catch (error) {
        console.error('Erro ao deletar preço:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const updatePreco = async (request, response) => {
    try{
        const {id_professor} = request.params;
        await precoRepository.updatePreco(id_professor, request.body);
        return response.status(200).json({ message: 'Atualização de preços efetuado com sucesso!'});
    } catch (error) {
        console.error('Erro ao atualizar preço:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

module.exports = {
    getAll,
    createPreco,
    deletePreco,
    updatePreco,
};