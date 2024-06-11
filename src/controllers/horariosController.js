const horariosRepository = require('../repositories/horariosRepository');

const getAll = async (request, response) => {
    try{
        const horarios = await horariosRepository.getAll();
        return response.status(200).json(horarios)
    } catch (error) {
        console.error('Erro ao exibir o horário:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

const createHorario = async (request, response) => {
    try{
        const createdHorario = await horariosRepository.createHorario(request.body);
        return response.status(201).json(createdHorario);
    } catch (error) {
        console.error('Erro ao criar o horário:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    };
};

// const deleteHorario = async (request, response) => {
//     try{
//         const { id_usuario, dia_semana } = request.params;
//         await horariosRepository.deleteHorario(id_usuario, dia_semana);
//         return response.status(204).json();
//     } catch (error) {
//         console.error('Erro ao deletar o horário:', error)
//         return response.status(500).json({ message: 'Erro interno no servidor'})
//     };
// };

const updateHorario = async (request, response) => {
    try {
        const { id_usuario, domingo, segunda, terca, quarta, quinta, sexta, sabado } = request.body;
        const result = await horariosRepository.updateHorario(id_usuario, { domingo, segunda, terca, quarta, quinta, sexta, sabado });

        return response.status(204).send();

    } catch (error) {
        console.error('Erro ao atualizar o horário:', error);
        return response.status(500).json({ message: 'Erro interno no servidor' });
    }
};


module.exports = {
    getAll,
    createHorario,
    updateHorario
};