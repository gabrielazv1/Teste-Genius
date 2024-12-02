import React, { useState } from "react";
import { SemiCircleProgress } from "react-semicircle-progressbar";

import "./Redacao.css";

function ProgressBar() {
  const pendencia = localStorage.getItem("pendencia");
  const [progress, setProgress] = useState<number>(
    pendencia ? Number(pendencia) : 0
  );
  const totalParts = 3;
  const palavra = progress > 1 ? "redações" : "redação";
  const redacoesAusentes = pendencia;

  return (
    <div className="container-redacao">
      <div className="titulo-container">
        <i className="fa-solid fa-file"></i>
        <p>Redações</p>
      </div>

      <div className="container-progresso">
        <SemiCircleProgress
          percentage={(progress / totalParts) * 100}
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
          percentageSeperator={`/${totalParts}`}
          strokeWidth={15}
          strokeColor="#00A69A"
          hasBackground={true}
          bgStrokeColor="#eee"
        />
      </div>
      <div>
        <p className="redacao-pendente">{redacoesAusentes}/3</p>
      </div>

      <p className="quantidade-redacao">
        Você possui{" "}
        <b className="redacoes-ausentes">
          {redacoesAusentes} {}
        </b>{" "}
        não entregues
      </p>

      <p className="informacao-redacao">
        Não atinja 3 redações, pois isso poderá te fazer perder sua bolsa
      </p>
    </div>
  );
}

export default ProgressBar;
