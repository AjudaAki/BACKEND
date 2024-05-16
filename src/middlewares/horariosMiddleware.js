const connection = require('../models/connection');

const validateUsuario = (request, response, next) => {
    const { body } = request;

    if (typeof body.id_usuario !== 'number' || isNaN(body.id_usuario)) {
        return response.status(400).json({ message: "É necessário atribuir um usuário a esse horário" });
    }

    next();
};

const validateHoraInicio = (request, response, next) => {
    const { body } = request;

    if (typeof body.hora_inicio !== 'string' || body.hora_inicio.trim() === '') {
        return response.status(400).json({ message: "É necessário definir um horário de início" });
    }

    next();
};

const validateHoraTermino = (request, response, next) => {
    const { body } = request;

    if (typeof body.hora_fim !== 'string' || body.hora_fim.trim() === '') {
        return response.status(400).json({ message: "É necessário definir um horário de término" });
    }

    next();
};

const validateDiaSemana = (request, response, next) => {
    const { body } = request;

    if (typeof body.dia_semana !== 'string' || body.dia_semana.trim() === '') {
        return response.status(400).json({ message: "É necessário definir um dia" });
    }

    if (body.dia_semana !== 'domingo' && 
        body.dia_semana !== 'segunda' &&
        body.dia_semana !== 'terça' && 
        body.dia_semana !== 'quarta' &&
        body.dia_semana !== 'quinta' && 
        body.dia_semana !== 'sexta' &&
        body.dia_semana !== 'sábado' 
    ) {
        return response.status(400).json({ message: "Dia inválido" });
    }

    next();
};

const horarioEmUso = async (request, response, next) => {
    const { id_usuario, dia_semana } = request.body;

    const [horario] = await connection.execute('SELECT * FROM HORARIOS WHERE id_usuario = ? AND dia_semana = ?', [id_usuario, dia_semana]);
    if (horario.length > 0) {
        return response.status(401).json({ message: 'Esse dia já está em uso' });
    }
        
    next();
};

module.exports = {
    validateUsuario,
    validateHoraInicio,
    validateHoraTermino,
    validateDiaSemana,
    horarioEmUso
};