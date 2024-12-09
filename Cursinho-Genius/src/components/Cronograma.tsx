import React, { useState, useEffect } from "react";
import Celula from "./Celula";
import Button from "@mui/material/Button";
import { Horario, CronogramaModel } from "../models/Objetos";
import CircularProgress from '@mui/material/CircularProgress';  // Importando o CircularProgress

const Cronograma = () => {
  const [editando, setEditando] = useState(false);
  const [horarios, setHorarios] = useState<CronogramaModel[]>([]);
  const [horariosCopia, setHorariosCopia] = useState<CronogramaModel[]>([]);
  const [alteracoes, setAlteracoes] = useState<Horario[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);  // Estado de carregamento

  const userTipo = localStorage.getItem("usuarioTipo");

  const podeEditar = (pode: boolean) => {
    if (userTipo === "ADMIN") {
      setEditando(pode);
      if (!pode) cancelarAlteracoes();
    }
  };

  const cancelarAlteracoes = () => {
    setHorariosCopia(horarios);
    setAlteracoes([]);
  };

  const salvarAlteracoes = async () => {
    try {
      const response = await fetch("https://cursinho-genius.onrender.com/cronograma/salvar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alteracoes),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar alterações.");
      }

      setEditando(!editando);
      setAlteracoes([]);
      setHorarios(horariosCopia);
    } catch (error) {
      console.error("Erro durante a requisição:", error);
    }
  };

  const handleDisciplinaChange = (horario: Horario) => {
    updateHorariosCopia(horario);

    setAlteracoes((prevAlteracoes) => {
      const existingHorarioIndex = prevAlteracoes.findIndex(
        (h) => h.id === horario.id
      );

      if (existingHorarioIndex !== -1) {
        const updatedAlteracoes = [...prevAlteracoes];
        updatedAlteracoes[existingHorarioIndex] = {
          ...updatedAlteracoes[existingHorarioIndex],
          idDisciplina: horario.idDisciplina,
          disciplina: horario.disciplina,
        };
        return updatedAlteracoes;
      } else {
        return [...prevAlteracoes, horario];
      }
    });
  };

  const updateHorariosCopia = (updatedHorario: Horario) => {
    const copiaAtualizada = horariosCopia.map((c) => ({
      ...c,
      horarios: c.horarios.map((h) => {
        if (h.id === updatedHorario.id) {
          return { ...h, ...updatedHorario };
        }
        return h;
      }),
    }));

    setHorariosCopia(copiaAtualizada);
  };

  const diasDaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

  useEffect(() => {
    const carregarHorarios = async () => {
      const response = await fetch("https://cursinho-genius.onrender.com/cronograma/carregar");
      const dados = await response.json();
      setHorarios(dados);
      setHorariosCopia(dados);
      setIsLoading(false);  // Dados carregados, atualizar estado de carregamento
    };
    carregarHorarios();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress sx={{ color: '#00A69A' }} />
        </div>
      ) : (
        <table className="tabela-cronograma" style={{ borderSpacing: '8px' }}>
          <thead>
            <tr>
              <th>Horário</th>
              {diasDaSemana.map((dia) => (
                <th key={dia}>{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horariosCopia.map((horaDia) => {
              const linhaIntervalo = horaDia.inicio === "19:50" ? (
                <tr key="intervalo">
                  <td colSpan={diasDaSemana.length + 1} style={{ backgroundColor: '#6755AA', color: 'white', textAlign: 'center' }}>
                    Intervalo - 20h30 às 20h40
                  </td>
                </tr>
              ) : null;
              return (
                <React.Fragment key={horaDia.inicio}>
                  <tr>
                    <td>{horaDia.inicio}</td>
                    {horaDia.horarios.map((horario) => (
                      <td key={horario.id} className="celula">
                        <Celula
                          horario={horario}
                          podeEditar={editando}
                          onDisciplinaChange={handleDisciplinaChange}
                        />
                      </td>
                    ))}
                  </tr>
                  {linhaIntervalo}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}

      {userTipo === "ADMIN" && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
          <Button
            variant="contained"
            color="error"
            onClick={() => podeEditar(!editando)}
            sx={{
              backgroundColor: '#574599',
              borderRadius: '7px',
              textAlign: 'center',
              color: 'white',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#4a3e80',
                boxShadow: 'none',
              },
            }}
          >
            {editando ? "Cancelar Edição" : "Habilitar Edição"}
          </Button>

          {alteracoes.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => salvarAlteracoes()}
              sx={{
                backgroundColor: '#00A69A',
                borderRadius: '7px',
                textAlign: 'center',
                color: 'white',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#028d83',
                },
              }}
            >
              Salvar Alterações
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Cronograma;
