"use client";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { Disciplina } from "../models/Objetos";

function SelecionarDisciplina({
  onEmit,
}: {
  onEmit: (disciplina: Disciplina) => void; // Tipagem correta para onEmit
}) {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  useEffect(() => {
    const carregarDisciplinas = async () => {
      try {
        const response = await fetch("http://localhost:8181/disciplina/listar");
        const dados = await response.json();
        setDisciplinas(dados);
      } catch (error) {
        console.error("Erro ao carregar disciplinas:", error);
      }
    };
    carregarDisciplinas();
  }, []);

  const sendMessageToParent = (disciplina: Disciplina) => {
    onEmit(disciplina); // Envia a disciplina selecionada ao componente pai
  };

  return (
    <div>
      <h1>Selecionar Disciplina:</h1>
      {disciplinas.map((disciplina) => (
        <Button
          sx={{ width: "45%", m: 1 }}
          variant="outlined"
          key={disciplina.id}
          onClick={() => sendMessageToParent(disciplina)}
        >
          {disciplina.nome}
        </Button>
      ))}
    </div>
  );
}

export default SelecionarDisciplina;
