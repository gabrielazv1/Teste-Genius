"use client";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { Disciplina } from "../models/Objetos";

function SelecionarDisciplina({
  onEmit,
}: {
  onEmit: (disciplina: Disciplina) => void;
}) {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  useEffect(() => {
    const carregarDisciplinas = async () => {
      try {
        const response = await fetch("https:/cursinho-genius.onrender.com/disciplina/listar");
        const dados = await response.json();
        setDisciplinas(dados);
      } catch (error) {
        console.error("Erro ao carregar disciplinas:", error);
      }
    };
    carregarDisciplinas();
  }, []);

  const sendMessageToParent = (disciplina: Disciplina) => {
    onEmit(disciplina);
  };

  return (
    <div id="selecionarDisciplina">
      <h1>Selecionar <strong>disciplina:</strong></h1>
      {disciplinas.map((disciplina) => (
        <Button
          sx={{ width: "45%", m: 1, borderRadius: "0.5vw", border: "none", backgroundColor: "#00A69A", color: "white"}}
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
