class Horarios {
    constructor(id_horario, id_usuario, hora_inicio, hora_fim, dia_semana) {
      this.id_horario = id_horario;
      this.id_usuario = id_usuario;
      this.hora_inicio = hora_inicio;
      this.hora_fim = hora_fim;
      this.dia_semana = dia_semana;
    }
};

module.exports = Horarios;