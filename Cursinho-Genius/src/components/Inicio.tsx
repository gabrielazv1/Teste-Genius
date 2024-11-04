import React from 'react';
import '../App.css';
import Header from './Header';
import Teacher from './Teacher'

const Inicio: React.FC = () => {

    const nomeUsuario = 'Nicole';
    const dataAtual = new Date();

    return (
        <div id="inicio">
            <section id="header"><Header nome={nomeUsuario} data={dataAtual} /></section>
            <section id="container-horario"></section>
            <section id="container-redacao"></section>
            <section id="container-faltas"></section>
            <aside><Teacher/></aside>
        </div>
    );
}

export default Inicio;
