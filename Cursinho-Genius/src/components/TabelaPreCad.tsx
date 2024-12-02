import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "@mui/material/Backdrop";
import ModalAluno from "./ModalAluno";

type Candidate = {
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

const TabelaPreCad = () => {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  async function getCandidates(): Promise<void> {
    try {
      const response = await fetch("https://cursinho-genius.onrender.com/candidato/listar", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Erro ao buscar candidatos: ${response.statusText}`);
      }
      const candidatesJson = await response.json();
      setCandidates(candidatesJson); // Recebe os candidatos diretamente da API
    } catch (error) {
      console.error("Erro ao exibir candidatos", error);
      alert("Ocorreu um erro ao buscar os candidatos");
    }
  }

  const debounceFetchCandidates = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      getCandidates();
    }, 500);
  };

  useEffect(() => {
    debounceFetchCandidates();
  }, []);

  const handleAccept = async (id: number) => {
    try {
      const response = await fetch(`https://cursinho-genius.onrender.com/candidato/aprovar/${id}`, {
        method: "POST",
      });

      if (response.ok) {
        alert("Candidato aprovado com sucesso!");
        getCandidates();
      } else {
        const errorText = await response.text();
        alert(`Erro ao aprovar candidato: ${errorText}`);
      }
    } catch (error) {
      console.error("Erro ao aprovar candidato", error);
      alert("Ocorreu um erro ao aprovar o candidato");
    }
  };

  const handleReject = async (id: number) => {
    try {
      const response = await fetch(`https://cursinho-genius.onrender.com/candidato/excluir/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Candidato removido com sucesso!");
        getCandidates();
      } else {
        const errorText = await response.text();
        alert(`Erro ao excluir candidato: ${errorText}`);
      }
    } catch (error) {
      console.error("Erro ao excluir candidato", error);
      alert("Ocorreu um erro ao excluir o candidato");
    }
  };

  const handleInfo = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="container-candidatos">
      <div className="candidatos-ativos">
        <table className="candidato-tabela">
          <thead className="cabecario-tabela-candidatos">
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className="tableDados">
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.nome}</td>
                <td>{candidate.cpf}</td>
                <td>{candidate.telefone}</td>
                <td>{candidate.email}</td>
                <td className="acceptButton">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    style={{
                      color: "#00A69A",
                      cursor: "pointer",
                      marginRight: "10px",
                      fontSize: "20px",
                    }}
                    onClick={() => handleAccept(candidate.id)}
                  />
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{
                      color: "#6755AA",
                      cursor: "pointer",
                      marginRight: "10px",
                      fontSize: "20px",
                    }}
                    onClick={() => handleReject(candidate.id)}
                  />
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    style={{
                      color: "#003d4e",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                    onClick={() => handleInfo(candidate)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedCandidate && (
        <Backdrop open={showModal} style={{ zIndex: 1300 }} onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <ModalAluno onClose={closeModal} aluno={selectedCandidate} />
          </div>
        </Backdrop>
      )}
    </div>
  );
};

export default TabelaPreCad;
