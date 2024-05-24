const connection = require('../repositorys/connection');

const validateProfessorIdParams = async (request, response, next) => {
    const { id_professor } = request.params;

    const [contato] = await connection.execute('SELECT * FROM USUARIOS WHERE id = ?', [id_professor]);
    if (contato.length === 0) {
        return response.status(401).json({ message: 'Professor não encontrado' });
    }
        
    next();
};

const validateProfessorContatoParams = async (request, response, next) => {
    const { id_professor } = request.params;

    const [contato] = await connection.execute('SELECT * FROM CONTATOS WHERE id_professor = ?', [id_professor]);
    if (contato.length > 0) {
        return response.status(401).json({ message: 'Esse professor já possui contatos cadastrados' });
    }

    next();
};

const validateProfessorContato = async (request, response, next) => {
    const { id_professor } = request.body;

    const [contato] = await connection.execute('SELECT * FROM CONTATOS WHERE id_professor = ?', [id_professor]);
    if (contato.length > 0) {
        return response.status(401).json({ message: 'Esse professor já possui contatos cadastrados' });
    }
        
    next();
};

const validateProfessorId = async (request, response, next) => {
    const { id_professor } = request.body;

    const [contato] = await connection.execute('SELECT * FROM USUARIOS WHERE id = ?', [id_professor]);
    if (contato.length === 0) {
        return response.status(401).json({ message: 'Professor não encontrado' });
    }
        
    next();
};

const validateFieldsLenght = async (request, response, next) => {

    const { discord, whatsapp, teams } = request.body;

    if (discord.length > 500){
        return response.status(400).json({ message: 'Número de caracteres acima do permitido no campo "discord".' });
    }

    if (whatsapp.length > 500){
        return response.status(400).json({ message: 'Número de caracteres acima do permitido no campo "whatsapp".' });
    }

    if (teams.length > 500){
        return response.status(400).json({ message: 'Número de caracteres acima do permitido no campo "teams".' });
    }
        
    next();
};

module.exports = {
    validateProfessorIdParams,
    validateProfessorContatoParams,
    validateProfessorId,
    validateProfessorContato,
    validateFieldsLenght
};