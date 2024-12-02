import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Garota_GIF from '../assets/Garota_GIF.gif';
import '../App.css';

interface Professor {
    id: number;
    nome: string;
    disciplina: string;
}

const Professores: React.FC = () => {
    const [professores, setProfessores] = useState<Professor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfessores = async () => {
            try {
                const response = await fetch('https://cursinho-genius.onrender.com/professor/listar?status=ATIVO');
                const data = await response.json();
                setProfessores(data);
            } catch (error) {
                console.error('Erro ao buscar professores:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfessores();
    }, []);

    return (
        <div id="teacher">
            <div className="textHeader">
                <i className="fa-solid fa-user-group"></i>
                <p>Professores</p>
            </div>
            {loading ? (
                <div className="loading-container">
                    <CircularProgress sx={{ color: '#00A69A' }} />
                </div>
            ) : (
                professores.map((professor) => (
                    <section key={professor.id} className="teacher_profile">
                        <div className="teacher_pic"></div>
                        <div>
                            <p className="profile_name">{professor.nome}</p>
                            <p className="ocupation">Professor de {professor.disciplina}</p>
                        </div>
                    </section>
                ))
            )}

            <img id="garota_gif" src={Garota_GIF} draggable="false" alt="" />
        </div>
    );
};

export default Professores;
