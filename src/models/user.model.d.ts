export interface User {
    id: integer;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    cpf: string;
    data_nascimento: date; 
    descricao: string;
    descricao_rapida: string;
    modo_professor: bit;
}