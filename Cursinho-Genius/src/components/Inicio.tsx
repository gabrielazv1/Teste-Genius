import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from './Header';
import Teacher from './Teacher';
import Cronograma from './Cronograma';
import ProgressPresenca from './ProgressPresenca';
import ProgressRedacoes from './ProgressRedacoes';

const Inicio: React.FC = () => {
    const [usuarioNome, setUsuarioNome] = useState<string>('');
    const dataAtual = new Date();

    useEffect(() => {
        const nome = localStorage.getItem('usuarioNome');
        if (nome) {
            setUsuarioNome(nome);
        }
    }, []);

    return (
        <div id="inicio">
            <section id="header"><Header nome={usuarioNome} data={dataAtual} /></section>
            <section id="container-horario"><Cronograma/></section>
            <section id="container-redacao"><ProgressRedacoes/></section>
            <section id="container-faltas"><ProgressPresenca/></section>
            <aside><Teacher /></aside>
        </div>
    );
}

export default Inicio;
