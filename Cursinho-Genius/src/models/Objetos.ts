interface CronogramaModel {
    inicio: string,
    fim: string,
    horarios: Horario[]
}

class Horario {
    id: number
    dia: string
    inicio: string 
    fim: string
    idDisciplina: number | null
    disciplina: Disciplina | null

    constructor(options: {
        id: number;
        dia?: string;
        inicio?: string;
        fim?: string;
        idDisciplina?: number | null;
    }, disciplina?: Disciplina | null) {
        this.id = options.id;
        this.dia = options.dia || ""; 
        this.inicio = options.inicio || "";
        this.fim = options.fim || "";
        this.idDisciplina = options.idDisciplina || null; 
        this.disciplina = disciplina || null;
    }
}

class Disciplina {
    id: number
    nome: string

    constructor (id: number, nome:string){
        this.id = id;
        this.nome = nome;
    } 
}

class AnoLetivo{
    id: number
    ano: number
    inicio:string
    termino:string
    diasLetivos: number
    status: string

    constructor (id: number, ano: number, inicio:string, termino:string, diasLetivos: number, status: string){
        this.id = id;
        this.ano = ano;
        this.inicio = inicio;
        this.termino = termino;
        this.diasLetivos = diasLetivos;
        this.status = status
    }
}

const TipoUsuarioEnum = Object.freeze({
    ADMIN: "ADMIN",
    ALUNO: "ALUNO",
    PROFESSOR: "PROFESSOR"
  });

export {Disciplina, Horario, TipoUsuarioEnum, AnoLetivo};
export type {CronogramaModel};
