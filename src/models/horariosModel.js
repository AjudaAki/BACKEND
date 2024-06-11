class Horarios {
    constructor(id_horario, id_usuario, domingo, segunda, terca, quarta, quinta, sexta, sabado) {
      this.id_horario = id_horario;
      this.id_usuario = id_usuario;
      this.domingo = domingo;
      this.segunda = segunda;
      this.terca = terca;
      this.quarta = quarta;
      this.quinta = quinta;
      this.sexta = sexta;
      this.sabado = sabado;
    }
};

module.exports = Horarios;