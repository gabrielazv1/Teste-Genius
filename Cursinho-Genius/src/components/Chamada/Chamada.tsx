import React, { useEffect, useRef, useState } from "react";
import "./Chamada.css";

type Student = {
  id: number;
  data: string;
  matricula: number;
  aluno: string;
  ano: number;
  presenca: boolean;
  presencaTexto: string;
};
type studentsStatus = {
  id: number;
  presenca: boolean;
};

type ChamadaProps = {
  finalizarChamada: () => void; // Função para finalizar a chamada
};

const Chamada: React.FC<ChamadaProps> = ({ finalizarChamada }) => {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function getActiveStudents(): Promise<any> {
    try {
      const response = await fetch(
        "https://cursinho-genius.onrender.com/chamada/iniciar",
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const studentJson = await response.json();
        const studentArray = transformToStudentList(studentJson);
        buildChamada(studentArray);
      } else {
        alert("Chamada Já foi feita hoje!");
      }
    } catch (error) {
      console.error("Erro ao fazer chamada", error);
      alert("Erro ao buscar alunos para chamada");
    }
  }

  async function sendStudentsStatus(): Promise<any> {
    let students = getIdOfAbsentStudents();
    try {
      const response = await fetch('https://cursinho-genius.onrender.com/chamada/mudarPresenca', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(students),
      });
    } catch (error) {
      console.error('Erro ao retornar alunos da chamada.', error);
    }
  }

  const debounceFetchStudents = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      getActiveStudents();
    }, 500);
  };

  useEffect(() => {
    debounceFetchStudents(); 
  }, []);

  return (
    <div id="chamada-content">
      <div className="chamada-container">
        <h1 className="titulo-chamada">Chamada</h1>
        <p className="sub-titulo-chamada">
          Desmarque os <b>alunos ausentes</b> e finalize a chamada
        </p>
        <div className="tabela-container">
          <table className="chamada-tabela">
            <thead className="cabecario-tabela">
              <tr>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="corpo-tabela"></tbody>
          </table>
        </div>
        <div className="finalizar-container">
          <button
            className="finalizar-btn"
            onClick={() => {
              sendStudentsStatus();
              finalizarChamada();
            }}
          >
            Finalizar Chamada
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chamada;

function getIdOfAbsentStudents(): any {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;

  const checkboxStates: studentsStatus[] = Array.from(checkboxes)
    .filter((checkbox) => !checkbox.checked)
    .map((checkbox) => ({
      id: Number(checkbox.id),
      presenca: checkbox.checked,
    }));
  return checkboxStates;
}

function transformToStudentList(data: any[]): Student[] {
  return data.map((item) => ({
    id: item.id,
    data: item.data,
    matricula: item.matricula,
    aluno: item.aluno,
    ano: item.ano,
    presenca: item.presenca,
    presencaTexto: item.presencaTexto,
  }));
}

function buildChamada(list: Student[]) {
  let tbody = document.getElementById("corpo-tabela");
  if (!tbody) throw "Elemento não encontrado.";

  tbody.innerHTML = "";

  list.forEach((item) => {
    let tr = document.createElement("tr");
    let tdNome = document.createElement("td");
    let tdMatricula = document.createElement("td");
    let tdStatus = document.createElement("td");

    let statusLabel = document.createElement("label");
    statusLabel.classList.add("checkbox-label");

    let statusInput = document.createElement("input");
    statusInput.classList.add("checkbox-input");
    statusInput.setAttribute("type", "checkbox");
    statusInput.setAttribute("checked", "true");
    statusInput.setAttribute("id", item.id + "");

    let statusSpan = document.createElement("span");
    statusSpan.classList.add("checkbox-custom");

    statusLabel.appendChild(statusInput);
    statusLabel.appendChild(statusSpan);

    tdNome.textContent = item.aluno;
    tdMatricula.textContent = item.matricula + "";
    tdStatus.appendChild(statusLabel);

    tr.appendChild(tdNome);
    tr.appendChild(tdMatricula);
    tr.appendChild(tdStatus);

    tbody.appendChild(tr);
  });
}
