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

  const celStyle = {
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    border: 'none', 
    color: 'inherit',  
    fontSize: 'inherit',
    textAlign: 'center',
    width: 'auto', 
    height: 'auto',
    borderRadius: 0
  };

  const style = {
    position: "absolute",
    borderRadius: "1vw",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  };

  const [open, setOpen] = useState(false);
  const [disciplina, setDisciplina] = useState<Disciplina | null>(horario.disciplina);

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
  };

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

  const renderContent = () => {
    if (disciplina != null) {
      return podeEditar ? (
        <Chip
          label={disciplina.nome}
          onDelete={() => handleDelete(horario)}
          sx={{ ...celStyle, fontSize: '14px', '& .MuiSvgIcon-root': { fontSize: 17 } }} 
        />
      ) : (
        <Chip
          label={disciplina.nome}
          sx={{ ...celStyle, '& .MuiSvgIcon-root': { fontSize: 17 } }}
        />
      );
    }

    return podeEditar ? (
      <Chip
        variant="outlined"
        label={"Adicionar"}
        deleteIcon={<AddIcon />}
        onDelete={handleOpen}
        sx={{ ...celStyle, fontSize: '14px', '& .MuiSvgIcon-root': { fontSize: 17 }}}
      />
    ) : (
      <div className="placeholder">-----------</div>
    );
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
