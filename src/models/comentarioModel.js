class Comentario {
    constructor(id_comentario, id_usuario, id_perfil, comentario_usuario) {
      this.id_comentario = id_comentario;
      this.id_usuario = id_usuario;
      this.id_perfil = id_perfil;
      this.comentario_usuario = comentario_usuario;
    }
};

module.exports = Comentario;