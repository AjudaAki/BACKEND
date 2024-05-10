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

const horarioEmUso = (request, response, next) => {
    //verificar se o horário está em uso ao tentar deletar
};

module.exports = {
    validateHoraInicio,
    validateHoraTermino,
    validateDiaSemana,
    horarioEmUso
};