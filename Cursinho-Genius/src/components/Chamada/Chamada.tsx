import React, { useEffect, useRef } from "react";
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
  finalizarChamada: () => void;
};

const Chamada: React.FC<ChamadaProps> = ({ finalizarChamada }) => {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getCurrentDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  async function getActiveStudents(): Promise<void> {
    const currentDate = getCurrentDate();
    const apiUrl = `https://cursinho-genius.onrender.com/chamada/listar?data=${currentDate}`;

    if (localStorage.getItem("chamadaFoiFeita") !== "1") {
      try {
        const response = await fetch(
          "https://cursinho-genius.onrender.com/chamada/iniciar"
        );
        if (response.ok) {
          const studentJson: unknown[] = await response.json();
          const studentArray = transformToStudentList(studentJson);
          localStorage.setItem("chamadaFoiFeita", "1");
          buildChamada(studentArray);
        } else {
          alert("Chamada já foi feita hoje!");
        }
      } catch (error) {
        console.error("Erro ao fazer chamada", error);
        alert("Erro ao buscar alunos para chamada");
      }
    } else {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const studentJson: unknown[] = await response.json();
          const studentArray = transformToStudentList(studentJson);
          buildChamada(studentArray);
        } else {
          alert("Chamada já foi feita hoje!");
        }
      } catch (error) {
        console.error("Erro ao fazer chamada", error);
        alert("Erro ao buscar alunos para chamada");
      }
    }
  }

  async function sendStudentsStatus(): Promise<void> {
    const students = getIdOfAbsentStudents();
    try {
      await fetch("https://cursinho-genius.onrender.com/chamada/mudarPresenca", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(students),
      });
    } catch (error) {
      console.error("Erro ao retornar alunos da chamada.", error);
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

// Funções Auxiliares

function getIdOfAbsentStudents(): studentsStatus[] {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]'
  ) as NodeListOf<HTMLInputElement>;

  return Array.from(checkboxes)
    .filter((checkbox) => !checkbox.checked)
    .map((checkbox) => ({
      id: Number(checkbox.id),
      presenca: checkbox.checked,
    }));
}

function transformToStudentList(data: unknown[]): Student[] {
  return (data as Student[])
    .map((item) => ({
      id: item.id,
      data: item.data,
      matricula: item.matricula,
      aluno: item.aluno,
      ano: item.ano,
      presenca: item.presenca,
      presencaTexto: item.presencaTexto,
    }))
    .sort((a, b) => a.aluno.localeCompare(b.aluno, "pt-BR"));
}

function buildChamada(list: Student[]) {
  const tbody = document.getElementById("corpo-tabela");
  if (!tbody) throw new Error("Elemento não encontrado.");

  tbody.innerHTML = "";

  list.forEach((item) => {
    const tr = document.createElement("tr");

    const tdNome = document.createElement("td");
    tdNome.textContent = item.aluno;

    const tdMatricula = document.createElement("td");
    tdMatricula.textContent = String(item.matricula);

    const tdStatus = document.createElement("td");

    const statusLabel = document.createElement("label");
    statusLabel.classList.add("checkbox-label");

    const statusInput = document.createElement("input");
    statusInput.classList.add("checkbox-input");
    statusInput.setAttribute("type", "checkbox");
    statusInput.checked = true;
    statusInput.id = String(item.id);

    const statusSpan = document.createElement("span");
    statusSpan.classList.add("checkbox-custom");

    statusLabel.appendChild(statusInput);
    statusLabel.appendChild(statusSpan);
    tdStatus.appendChild(statusLabel);

    tr.appendChild(tdNome);
    tr.appendChild(tdMatricula);
    tr.appendChild(tdStatus);

    tbody.appendChild(tr);
  });
}
