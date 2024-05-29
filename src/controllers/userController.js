const { response } = require('express');
const userRepository = require('../repositories/userRepository');
const {v4} = require('uuid');
const path = require('path');
const fs = require('fs');

const getAll = async (request, response) => {
    const users = await userRepository.getAll();
    return response.status(200).json(users)
};

const getOneAluno = async (request, response) => {
    const user = await userRepository.getOneAluno(request.params.id);
    return response.status(200).json(user)
};

const getOneProf = async (request, response) => {
    const user = await userRepository.getOneProf(request.params.id);
    return response.status(200).json(user)
};

const getProfs = async (request, response) => {
    const users = await userRepository.getProfs();
    return response.status(200).json(users)
};

const getImgPerfil = async (request, response) => {
    try {
        const [imgs] = await userRepository.getIMG(request.params.id);
        
        if (!imgs) {
            return response.status(404).json({ error: 'Usuário não encontrado' });
        }

        const img_path = imgs.img_perfil;

        if (!img_path) {
            return response.status(404).json({ error: 'Imagem de perfil não encontrada' });
        }

        const realImgPath = path.join(process.cwd(), img_path);

        if (!fs.existsSync(realImgPath)) {
            return response.status(404).json({ error: 'Imagem de perfil não encontrada' });
        }

        return response.status(200).sendFile(realImgPath);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro interno no servidor' });
    }
};

const createAluno = async (request, response) => {
    const base64Data = request.body.img_perfil.replace(/^data:image\/png;base64,/, "");
    const imgPath = `imagens/${v4()}.png`;
    require("fs").writeFileSync(imgPath, base64Data, 'base64')
    request.body.img_perfil = imgPath;
    const createdAluno = await userRepository.createAluno(request.body);

    return response.status(201).json(createdAluno);
};

const createProfessor = async (request, response) => {
    const base64Data = request.body.img_perfil.replace(/^data:image\/png;base64,/, "");
    const imgPath = `imagens/${v4()}.png`;
    require("fs").writeFileSync(imgPath, base64Data, 'base64')
    request.body.img_perfil = imgPath;
    const createdProfessor = await userRepository.createProfessor(request.body);
    
    return response.status(201).json(createdProfessor);
};

const deleteUser = async (request, response) => {
    const { id } = request.params;
    await userRepository.deleteUser(id);
    return response.status(204).json()
};

const updateUser = async (request, response) => {
    const { id } = request.params;
    await userRepository.updateUser(id, request.body);
    return response.status(204).json();
};

module.exports = {
    getAll,
    getProfs,
    getOneAluno,
    getOneProf,
    getImgPerfil,
    createProfessor,
    createAluno,
    deleteUser,
    updateUser
};