class User {
    constructor(id, name, email, senha, telefone, cpf, data_nascimento, descricao, descricao_rapida, modo_professor, img_perfil) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.senha = senha;
      this.telefone = telefone;
      this.cpf = cpf;
      this.data_nascimento = data_nascimento;
      this.descricao = descricao;
      this.descricao_rapida = descricao_rapida;
      this.modo_professor = modo_professor;
      this.img_perfil = img_perfil;
    }
};

module.exports = User;