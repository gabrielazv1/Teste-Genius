import React, { useEffect, useRef, useState } from "react";
import "./ListarAlunos.css";

type Student = {
  id: number;
  nome: string,
  email: string,
  cpf: string,
  telefone: string,
};

const ListarAlunos = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function getStudents(): Promise<void> {
    try {
      const response = await fetch("https://cursinho-genius.onrender.com/aluno/listar", {
        method: "GET",
      });
      const studentsJson = await response.json();
      const studentArray = transformToStudentList(studentsJson);
      setStudents(studentArray);
    } catch (error) {
      console.error("Erro ao exibir alunos", error);
    }
  }

  const debounceFetchStudents = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      getStudents();
    }, 500);
  };

  useEffect(() => {
    debounceFetchStudents();
  }, []);

  return (
    <div className="container-alunos">
      <div className="alunos-ativos">
        <table className="aluno-tabela">
          <thead className="cabecario-tabela-alunos">
            <tr>
              <th>Nome</th>
              <th>Matrícula</th>
              <th>Telefone</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.nome}</td>
                <td>{student.cpf}</td>
                <td>{student.telefone}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarAlunos;

function transformToStudentList(data: any[]): Student[] {
  return data.map((item) => ({
    id: item.id,
    nome: item.nome,
    email: item.email,
    cpf: item.cpf,
    telefone: item.telefone,
  }));
}
