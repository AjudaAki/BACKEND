const connection = require('../models/connection');

const validateName = (request, response, next) => {
    const { nome } = request.body;

    if (typeof nome !== 'string' || nome.trim() === '') {
        return response.status(400).json({ message: "O campo nome é necessário" });
    }

    if (nome.length > 255) {
        return response.status(404).json({ message: 'Número de caracteres acima do permitido no campo "Nome".' });
    }

    next();
};

const validateEmail = async (request, response, next) => {
    const { email } = request.body;

    if (typeof email !== 'string' || email.trim() === '') {
        return response.status(400).json({ message: "O campo email é necessário" });
    }

    if (email.length > 255) {
        return response.status(404).json({ message: 'Número de caracteres acima do permitido no campo "email".' });
    }

    try {
        // Verifica apenas se o e-mail já está cadastrado se estiver sendo atualizado
        if (request.params.id) {
            const [user] = await connection.execute('SELECT * FROM USUARIOS WHERE email = ? AND id != ?', [email, request.params.id]);
            if (user.length !== 0) {
                return response.status(401).json({ message: 'Email já cadastrado' });
            }
        } else {
            // Caso seja um novo usuário, verifica se o e-mail já está cadastrado
            const [user] = await connection.execute('SELECT * FROM USUARIOS WHERE email = ?', [email]);
            if (user.length !== 0) {
                return response.status(401).json({ message: 'Email já cadastrado' });
            }
        }

        next();
    } catch (error) {
        console.error("Erro ao verificar o email:", error);
        return response.status(500).json({ message: "Erro interno do servidor" });
    }
};

  
const validatePassword = (request, response, next) => {
    const { senha } = request.body;
    
    if (typeof senha !== 'string' || senha.trim() === '') {
        return response.status(400).json({ message: "O campo senha é necessário" });
    }
        
    if (senha.length < 8){
        return response.status(400).json({ message: "A senha deve ter pelo menos 8 caracteres" });
    };

    if (senha.length > 255) {
        return response.status(404).json({ message: 'Número de caracteres acima do permitido no campo "senha".' });
    }

    next();
};

const validateTelefone = (request, response, next) => {
    const { telefone } = request.body;
    
    if (typeof telefone !== 'string' || telefone.trim() === '') {
        return response.status(400).json({ message: "O campo telefone é necessário" });
    }
        
    if (telefone.length < 8){
        return response.status(400).json({ message: "O telefone deve ter pelo menos 10 caracteres" });
    };

    if (telefone.length > 15){
        return response.status(400).json({ message: 'Número de caracteres acima do permitido no campo "senha".' });
    }

    next();
};

const validateCpf = (request, response, next) => {
    const { cpf } = request.body;
    
    if (typeof cpf !== 'string' || cpf.trim() === '') {
        return response.status(400).json({ message: "O campo CPF é necessário" });
    }
        
    if (cpf.length < 10){
        return response.status(400).json({ message: "O CPF deve ter pelo menos 10 caracteres" });
    };

    if (cpf.length > 15){
        return response.status(400).json({ message: 'Número de caracteres acima do permitido no campo "cpf".' });
    }

    next();
};

const validateNascimento = (request, response, next) => {
    const { data_nascimento } = request.body;
    
    if (typeof data_nascimento !== 'string' || data_nascimento.trim() === '') {
        return response.status(400).json({ message: "O campo data nascimento é necessário" });
    }

    next();
};

const validateDescricao = (request, response, next) => {
    const { descricao } = request.body;
    
    if (typeof descricao !== 'string' || descricao.trim() === '') {
        return response.status(400).json({ message: "O campo descrição é necessário" });
    }

    if (descricao.length > 700){
        return response.status(400).json({ message: 'Número de caracteres acima do permitido no campo "descricao".' });
    }

    next();
};

const validateDescricaoRapida = (request, response, next) => {
    const { descricao_rapida } = request.body;
    
    if (typeof descricao_rapida !== 'string' || descricao_rapida.trim() === '') {
        return response.status(400).json({ message: "O campo descricao rapida é necessário" });
    }

    if (descricao_rapida.length > 150){
        return response.status(400).json({ message: 'Número de caracteres acima do permitido no campo "descricao rapida".' });
    }

    next();
};

const validateIdUsuarioParam = (request, response, next) => {
    const { params } = request;
    const idLogado = request.userId; 

    if (isNaN(params.id) || parseInt(params.id) !== parseInt(idLogado)) {
        return response.status(400).json({ message: "Usuário inválido" });
    }

    next();
};

module.exports = {
    validateName,
    validateEmail,
    validatePassword,
    validateTelefone,
    validateCpf,
    validateNascimento,
    validateDescricao,
    validateDescricaoRapida,
    validateIdUsuarioParam
}