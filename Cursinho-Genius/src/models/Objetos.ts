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

export {Disciplina, Horario};
export type {CronogramaModel};
