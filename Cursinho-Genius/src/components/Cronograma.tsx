"use client";
import React, { useState, useEffect } from "react";
import Celula from "./Celula";
import Button from "@mui/material/Button";
import { Horario, CronogramaModel} from "../models/Objetos";

const Cronograma = () => {
  const [editando, setEditando] = useState(false);
  const [horarios, setHorarios] = useState<CronogramaModel[]>([]);
  const [horariosCopia, setHorariosCopia] = useState<CronogramaModel[]>([]);
  const [alteracoes, setAlteracoes] = useState<Horario[]>([]);

  useEffect(() => {
    const carregarHorarios = async () => {
      const response = await fetch("https://cursinho-genius.onrender.com/cronograma/carregar");
      const dados = await response.json();
      setHorarios(dados);
      setHorariosCopia(dados); // Inicializa a cópia com os dados carregados
    };
      carregarHorarios();
    }, []);

  const podeEditar = (pode: boolean) => {
    setEditando(pode);
    if (!pode) cancelarAlteracoes();
  };

  const cancelarAlteracoes = () => {
    setHorariosCopia(horarios); // Restabelece a cópia
    setAlteracoes([]); // Limpa as alterações
  };

  const salvarAlteracoes = async () => {
    try {
        const response = await fetch("https://cursinho-genius.onrender.com/cronograma/salvar", {
            method: "PUT",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(alteracoes),
        });

        if (!response.ok) {
            throw new Error("Erro ao salvar alterações.");
        }

        setEditando(!editando)
        setAlteracoes([])
        setHorarios(horariosCopia);

    } catch (error) {
        console.error("Erro durante a requisição:", error);
    }
};


  // Muda array de alterações e copia dos horarios
  const handleDisciplinaChange = (horario: Horario) => {
    updateHorariosCopia(horario); // Atualiza a cópia do horário

    setAlteracoes((prevAlteracoes) => {
      const existingHorarioIndex = prevAlteracoes.findIndex(
        (h) => h.id === horario.id
      ); // Achar o horario modificado nas lista de alterações

      if (existingHorarioIndex !== -1) {
        const updatedAlteracoes = [...prevAlteracoes];
        updatedAlteracoes[existingHorarioIndex] = {
          ...updatedAlteracoes[existingHorarioIndex],
          idDisciplina: horario.idDisciplina,
          disciplina: horario.disciplina,
        };
        return updatedAlteracoes;
      } else {
        return [...prevAlteracoes, horario]; // Adiciona novo horário ao conjunto que ja existia
      }
    });
  };

  // Muda copia dos horarios
  const updateHorariosCopia = (updatedHorario: Horario) => {
    // Atualiza a cópia do horário de maneira imutável
    const copiaAtualizada = horariosCopia.map((c) => ({
      ...c,
      horarios: c.horarios.map((h) => {
        if (h.id === updatedHorario.id) {
          return { ...h, ...updatedHorario }; // Atualiza o horário correspondente
        }
        return h;
      }),
    }));

    setHorariosCopia(copiaAtualizada);
  };

  const diasDaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

  return (
    <div>
      <table className="tabela-cronograma">
        <thead>
          <tr>
            <th>Horário</th>
            {diasDaSemana.map((dia) => (
              <th key={dia}>{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horariosCopia.map((horaDia) => (
            <tr key={`${horaDia.inicio}`}>
              <td>{`${horaDia.inicio} - ${horaDia.fim}`}</td>
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
          ))}
        </tbody>
      </table>
      <Button
        variant="contained"
        color="error"
        onClick={() => podeEditar(!editando)}
      >
        {editando ? "Cancelar" : "Habilitar Edição"}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => salvarAlteracoes()}
      >
        Salvar Alterações
      </Button>

      {alteracoes.map((alteracao: Horario) => (
        <div key={alteracao.id}>
          <div>ID horário: {alteracao.id}</div>
          <div>
            Disciplina:{" "}
            {alteracao.disciplina
              ? alteracao.disciplina.nome
              : "Removeu disciplina"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cronograma;
