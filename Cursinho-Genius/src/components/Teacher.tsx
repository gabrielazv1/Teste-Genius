import React from 'react';
import Garota_GIF from '../assets/Garota_GIF.gif';
import '../App.css';

const Inicio: React.FC = () => {
    
    const professores = [
        { nome: 'Alexandre', ocupacao: 'Professor de Matemática' },
        { nome: 'Douglas', ocupacao: 'Professor de Biologia' },
        { nome: 'Licinio', ocupacao: 'Professora de História' },
        { nome: 'Carlos', ocupacao: 'Professor de Física' },
        { nome: 'Luciana', ocupacao: 'Professora de Química' },
        { nome: 'Júlia', ocupacao: 'Professora de Português' },
        { nome: 'Renato', ocupacao: 'Professor de Geografia' },
        { nome: 'Sandra', ocupacao: 'Professora de Inglês' },
    ];

    return (
        <div id='teacher'>
            <div className='textHeader'>
                <i className="fa-solid fa-user-group"></i>
                <p>Professores</p>
            </div>
            {professores.map((professor, index) => (
                <section key={index} className="teacher_profile">
                    <div className="teacher_pic"></div>
                    <div>
                        <p className="profile_name">{professor.nome}</p>
                        <p className="ocupation">{professor.ocupacao}</p>
                    </div>
                </section>
            ))}

            <img id="garota_gif" src={Garota_GIF} draggable="false" alt="" />
        </div>
    );
}

export default Inicio;
