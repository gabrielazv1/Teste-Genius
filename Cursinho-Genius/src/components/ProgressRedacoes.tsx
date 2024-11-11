import React, { useState } from 'react';
import '../App.css';

function ProgressBar() {
  const [progress, setProgress] = useState(50); // Valor inicial da barra (50%)

  return (
    <div className="progress-container">
      <div className="circular-progress">
        <div className="circle">
          <div className="mask full" style={{ transform: `rotate(${progress * 1.8}deg)` }}></div>
          <div className="mask half">
            <div className="fill" style={{ transform: `rotate(${progress * 1.8}deg)` }}></div>
          </div>
          <div className="inside-circle">
            {progress}%
          </div>
        </div>
      </div>
      <button onClick={() => setProgress((prev) => Math.min(prev + 10, 100))}>
        Aumentar
      </button>
      <button onClick={() => setProgress((prev) => Math.max(prev - 10, 0))}>
        Diminuir
      </button>
    </div>
  );
}

export default ProgressBar;
