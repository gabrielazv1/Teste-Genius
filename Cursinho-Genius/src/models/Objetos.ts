interface CronogramaModel {
    inicio: string, //"19:10"
    fim: string, //"19:10"
    horarios: Horario[]
}

class Horario {
    id: number
    dia: string
    inicio: string //"19:10"
    fim: string//"19:10"
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
        this.dia = options.dia || ""; // Default para uma string vazia
        this.inicio = options.inicio || ""; // Default para uma string vazia
        this.fim = options.fim || ""; // Default para uma string vazia
        this.idDisciplina = options.idDisciplina || null; // Default para null
        this.disciplina = disciplina || null; // Default para null
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

export {Disciplina, Horario};
export type {CronogramaModel};
