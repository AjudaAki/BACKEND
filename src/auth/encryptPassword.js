const bcrypt = require('bcrypt');

const encryptPassword = async (senha) => {
    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error('Erro ao encriptar a senha');
    }
};

module.exports = encryptPassword;