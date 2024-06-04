class Localizacao {
    constructor(id_usuario, estado, cidade, bairro, rua, numero_casa) {
      this.id_usuario = id_usuario;
      this.estado = estado;
      this.cidade = cidade;
      this.bairro = bairro;
      this.rua = rua;
      this.numero_casa = numero_casa;
    }
};

module.exports = Localizacao;