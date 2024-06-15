const { response } = require('express');
const userRepository = require('../repositories/userRepository');
const {v4} = require('uuid');
const path = require('path');
const fs = require('fs');

const getAll = async (request, response) => {
    try{
        const users = await userRepository.getAll();
        return response.status(200).json(users)
    } catch (error) {
        console.error('Erro ao exibir os usuários:', error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    };
};

const getOneAluno = async (request, response) => {
    try{
        const user = await userRepository.getOneAluno(request.params.id);
        return response.status(200).json(user)
    } catch (error) {
        console.error('Erro ao exibir o aluno:', error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    };
};

const getOneProf = async (request, response) => {
    try{
        const user = await userRepository.getOneProf(request.params.id);
        return response.status(200).json(user)
    } catch (error) {
        console.error('Erro ao exibir o aluno:', error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    };
};

const getAlunoLog = async (request, response) => {
    try {
        const idLogado = request.userId;
        const users = await userRepository.getAlunoLog(idLogado);
        const user = users[0]; 

        return response.status(200).json(user);

    } catch (error) {
        console.error('Erro ao exibir o aluno:', error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const getProfessoresCard = async (request, response) => {
    try {
        const users = await userRepository.getProfessoresCard();
        return response.status(200).json(users);
    } catch (error) {
        console.error('Erro ao exibir o professor.', error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const getProfessorLog = async (request, response) => {
    try{
        const idLogado = request.userId; 
        const user = await userRepository.getOneProf(idLogado);
        return response.status(200).json(user)
    } catch (error) {
        console.error('Erro ao exibir o professor:', error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    };
};

const getProfs = async (request, response) => {
    try{
        const users = await userRepository.getProfs();
        return response.status(200).json(users)
    } catch (error) {
        console.error('Erro ao exibir o professor:', error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    };
};

const getImgPerfil = async (request, response) => {
    try {
        const [imgs] = await userRepository.getIMG(request.params.id);
        
        if (!imgs) {
            return response.status(404).json({ message: 'Usuário não encontrado' });
        }

        const img_path = imgs.img_perfil;

        if (!img_path) {
            return response.status(404).json({ message: 'Imagem de perfil não encontrada' });
        }

        const realImgPath = path.join(process.cwd(), img_path);

        if (!fs.existsSync(realImgPath)) {
            return response.status(404).json({ message: 'Imagem de perfil não encontrada' });
        }

        return response.status(200).sendFile(realImgPath);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Erro interno no servidor' });
    }
};

const createAluno = async (request, response) => {
    try {
        const baseUrl = 'http://localhost:3333/';  // URL base da sua API
        const base64Data = request.body.img_perfil.replace(/^data:image\/png;base64,/, "");
        const imgPath = `imagens/${v4()}.png`;
        require("fs").writeFileSync(imgPath, base64Data, 'base64')
        
        // Construa a URL completa da imagem
        request.body.img_perfil = `${baseUrl}${imgPath}`;
        
        const createdAluno = await userRepository.createAluno(request.body);
    
        return response.status(201).json(createdAluno);
    } catch (error) {
        console.error('Erro ao criar o aluno:', error)
        return response.status(500).json({ message: 'Erro interno no servidor' });
    }
};


const createProfessor = async (request, response) => {
    try{
        const base64Data = request.body.img_perfil.replace(/^data:image\/png;base64,/, "");
        const imgPath = `imagens/${v4()}.png`;
        require("fs").writeFileSync(imgPath, base64Data, 'base64')
        request.body.img_perfil = imgPath;
        const createdProfessor = await userRepository.createProfessor(request.body);
    
        return response.status(201).json(createdProfessor);
    } catch (error) {
        console.error('Erro ao criar o professor:', error)
        return response.status(500).json({ message: 'Erro interno no servidor' });
    }    
};

const deleteUser = async (request, response) => {
    try{
        const { id } = request.params;
        await userRepository.deleteUser(id);
        return response.status(204).json()
    } catch (error) {
        console.error('Erro ao deletar o usuário:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'});
    };
};

const updateUser = async (request, response) => {
    try{
        const { id } = request.params;
        await userRepository.updateUser(id, request.body);
        return response.status(204).json();
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error)
        return response.status(500).json({ message: 'Erro interno no servidor'})
    }
};

const getProfessores = async (request, response) => {
    try{
        const users = await userRepository.getProfessores();
        return response.status(200).json(users)
    }catch(error){
        console.error('Erro ao exibir o professor.:', error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const getSelecionarProf = async (request, response) => {
    try {
        const { id_prof } = request.params; 
        const user = await userRepository.getSelecionarProf(id_prof); 
        return response.status(200).json(user);
    } catch (error) {
        console.error('Erro ao exibir o professor:', error);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const createProfAll = async (request, response) => {
    try {
        const baseUrl = 'http://localhost:3333/';  // URL base da sua API
        const base64Data = request.body.img_perfil.replace(/^data:image\/png;base64,/, "");
        const imgPath = `imagens/${v4()}.png`;
        fs.writeFileSync(imgPath, base64Data, 'base64');
        
        request.body.img_perfil = `${baseUrl}${imgPath}`;
        
        const createdProfessor = await userRepository.createProfAll(request.body);
    
        return response.status(201).json(createdProfessor);
    } catch (error) {
        console.error('Erro ao criar o professor:', error);
        return response.status(500).json({ message: 'Erro interno no servidor' });
    }
};

module.exports = {
    getAll,
    getProfs,
    getOneAluno,
    getOneProf,
    getAlunoLog,
    getProfessorLog,
    getImgPerfil,
    createProfessor,
    createAluno,
    deleteUser,
    updateUser,
    getProfessores,
    getSelecionarProf,
    createProfAll,
    getProfessoresCard
};