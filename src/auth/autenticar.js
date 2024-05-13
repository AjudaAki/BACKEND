const connection = require('../models/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const autenticar = async (request, response) => {
    try {
        const { email, senha } = request.body;

        // Verificar se o e-mail existe no banco de dados
        const [user] = await connection.execute('SELECT * FROM USUARIOS WHERE email = ?', [email]);
        if (user.length === 0) {
            return response.status(401).json({ message: 'Email não cadastrado' });
        };
        
        // Verificar a senha
        const passwordMatch = await bcrypt.compare(senha, user[0].senha);
        if (!passwordMatch) {
            return response.status(401).json({ message: 'Credenciais inválidas' });
        };

        // Gerar token JWT
        const token = jwt.sign({ userId: user[0].id }, 'Token');

        return response.status(200).json({ token });

    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        response.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports = {
    autenticar,
};