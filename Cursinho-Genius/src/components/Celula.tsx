"use client";
import React, { useState, useEffect } from "react";
import SelecionarDisciplina from "./SelecionarDisciplina";

import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Horario, Disciplina } from "../models/Objetos";

function Celula({
  horario,
  podeEditar,
  onDisciplinaChange,
}: {
  horario: Horario;
  podeEditar: boolean;
  onDisciplinaChange: (horario: Horario) => void;
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  };

  const [open, setOpen] = useState(false); // Estado do Modal

  const [disciplina, setDisciplina] = useState<Disciplina | null>(
    horario.disciplina
  ); // Disciplina que vai ser exibida ao carregar

  const handleDelete = (horario: Horario) => {
    setDisciplina(null);
    onDisciplinaChange(
      new Horario(
        {
          id: horario.id,
          dia: horario.dia,
          inicio: horario.inicio,
          fim: horario.fim,
          idDisciplina: null,
        },
        null
      )
    );
  }; // Remover disciplina da célula

  const handleEmit = (novaDisciplina: Disciplina) => {
    handleAdd(horario, novaDisciplina);
  };

  useEffect(() => {
    setDisciplina(horario.disciplina);
  }, [horario]);

  const handleAdd = (horario: Horario, novaDisciplina: Disciplina) => {
    setOpen(false);
    setDisciplina(novaDisciplina);
    onDisciplinaChange(
      new Horario(
        {
          id: horario.id,
          dia: horario.dia,
          inicio: horario.inicio,
          fim: horario.fim,
          idDisciplina: novaDisciplina.id,
        },
        novaDisciplina
      )
    );
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Conteúdo do componente
  const renderContent = () => {
    if (disciplina != null) {
      return podeEditar ? (
        <Chip label={disciplina.nome} onDelete={() => handleDelete(horario)} />
      ) : (
        <Chip label={disciplina.nome} />
      );
    }

    return podeEditar ? (
      <Chip
        variant="outlined"
        label={"Adicionar"}
        deleteIcon={<AddIcon />}
        onDelete={handleOpen}
      />
    ) : null;
  };

  return (
    <div>
      {renderContent()}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SelecionarDisciplina onEmit={handleEmit}></SelecionarDisciplina>
        </Box>
      </Modal>
    </div>
  );
}

export default Celula;
