const connection = require('../repositories/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const autenticar = async (request, response) => {
    try {
        const { email, senha } = request.body;

        const [users] = await connection.execute('SELECT * FROM USUARIOS WHERE email = ?', [email]);
        if (users.length === 0) {
            return response.status(401).json({ message: 'Email não cadastrado' });
        };

        const user = users[0];

       
        const passwordMatch = await bcrypt.compare(senha, user.senha);
        if (!passwordMatch) {
            return response.status(401).json({ message: 'Credenciais inválidas' });
        };

        const modoProfessor = user.modo_professor.readUInt8(0);

        const token = jwt.sign({ userId: user.id, role: modoProfessor }, process.env.SecretToken);
        return response.status(200).json({ token, userId: user.id, role: modoProfessor });
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        response.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports = {
    autenticar
};