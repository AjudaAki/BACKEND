const jwt = require('jsonwebtoken');

const validateToken = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SecretToken);
        request.userId = decoded.userId; 
        next();
    } catch (error) {
        console.error('Erro na verificação do token:', error);
        return response.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

module.exports = {
    validateToken
};
