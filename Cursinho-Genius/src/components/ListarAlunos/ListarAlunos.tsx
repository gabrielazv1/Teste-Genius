import React, { useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import ModalAluno from "../ModalAluno";
import "./ListarAlunos.css";

type FormData = {
  id: number;
  nome: string;
  nomeMae: string;
  nomePai: string;
  cpf: string;
  rg: string;
  email: string;
  nacionalidade: string;
  naturalidade: string;
  endereco: string;
  numero: number;
  bairro: string;
  cidade: string;
  cep: string;
  telefone: string;
};

const ListarAlunos = () => {
  const [students, setStudents] = useState<FormData[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<FormData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getStudents = async () => {
    try {
      const response = await fetch(
        "https://cursinho-genius.onrender.com/aluno/listar?status=ATIVO"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar alunos");
      }
      const data: FormData[] = await response.json();
      const sortedData = data.sort((a, b) => 
        a.nome.localeCompare(b.nome, "pt-BR")
      );
  
      setStudents(sortedData);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Erro desconhecido", error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  
  const debounceFetchStudents = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => getStudents(), 500);
  };

  useEffect(() => {
    debounceFetchStudents();
  }, []);

  // Função para abrir modal
  const handleInfo = (student: FormData) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  // Função para fechar modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <div className="container-alunos">
      {isLoading ? (
        <div className="loading">
          <CircularProgress sx={{ color: "#00A69A" }} />
        </div>
      ) : (
        <div className="alunos-ativos">
          <table className="aluno-tabela">
            <thead className="cabecario-tabela-alunos">
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.nome}</td>
                  <td>{student.cpf}</td>
                  <td>{student.telefone}</td>
                  <td>{student.email}</td>
                  <td className="infoButton">
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      style={{
                        color: "#003d4e",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                      onClick={() => handleInfo(student)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedStudent && (
        <Backdrop
          open={showModal}
          style={{ zIndex: 1300 }}
          onClick={closeModal}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <ModalAluno onClose={closeModal} aluno={selectedStudent} />
          </div>
        </Backdrop>
      )}
    </div>
  );
};

export default ListarAlunos;
