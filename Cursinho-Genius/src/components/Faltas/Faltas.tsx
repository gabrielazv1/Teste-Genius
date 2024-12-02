import React, { useState } from "react";
import "./Faltas.css";
import { SemiCircleProgress } from "react-semicircle-progressbar";

function Faltas() {
  const totalChamadas = Number(localStorage.getItem("totalChamada"));
  const totalFaltas = Number(localStorage.getItem("chamadaUsuario"));

  const chamadas = (totalFaltas / totalChamadas) * 100;

  console.log(chamadas);

  const [faltas, setFaltas] = useState<number>(chamadas);

  return (
    <div className="container-faltas">
      <div className="titulo-container">
        <i className="fa-solid fa-user-check"></i>
        <p>Presença</p>
      </div>

      <div className="container-progresso-faltas">
        <SemiCircleProgress
          percentage={Math.floor(faltas)}
          size={{
            width: 300,
            height: 200,
          }}
          fontStyle={{
            fontSize: "25px",
            fontWeight: "700",
            fill: "#6755AA",
          }}
          strokeLinecap="round"
          percentageSeperator="%"
          strokeWidth={15}
          strokeColor="#6755AA"
          hasBackground={true}
          bgStrokeColor="#eee"
        />
      </div>

      <p className="quantidade-faltas">
        Você possui <b className="faltas">{Math.floor(faltas)} de presença</b>{" "}
      </p>

      <p className="informacao-faltas">
        Não atinja 25% de falta, isso poderá te fazer perder sua bolsa
      </p>
    </div>
  );
}

export default Faltas;
