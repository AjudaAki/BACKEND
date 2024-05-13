const connection = require('../models/connection');

const validateName = (request, response, next) => {
    const { nome } = request.body;

    if (typeof nome !== 'string' || nome.trim() === '') {
        return response.status(400).json({ message: "O campo nome é necessário" });
    }

    next();
};

const validateEmail = async (request, response, next) => {
    const { email } = request.body;

    if (typeof email !== 'string' || email.trim() === '') {
        return response.status(400).json({ message: "O campo email é necessário" });
    }

    try {
        const [user] = await connection.execute('SELECT * FROM USUARIOS WHERE email = ?', [email]);

        if (user.length !== 0) {
            return response.status(401).json({ message: 'Email já cadastrado' });
        }

        next();
    } 
    
    catch (error) {
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

    next();
};

const validateCpf = (request, response, next) => {
    const { cpf } = request.body;
    
    if (typeof cpf !== 'string' || cpf.trim() === '') {
        return response.status(400).json({ message: "O campo CPF é necessário" });
    }
        
    if (cpf.length < 8){
        return response.status(400).json({ message: "O CPF deve ter pelo menos 10 caracteres" });
    };

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

    next();
};

const validateDescricaoRapida = (request, response, next) => {
    const { descricao_rapida } = request.body;
    
    if (typeof descricao_rapida !== 'string' || descricao_rapida.trim() === '') {
        return response.status(400).json({ message: "O campo descricao rapida é necessário" });
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
    validateDescricaoRapida
}