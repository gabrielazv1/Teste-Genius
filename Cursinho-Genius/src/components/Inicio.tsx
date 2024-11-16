import React, { useEffect, useState } from 'react';
import '../App.css';
import Data from './Data';
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
            // Pegando apenas o primeiro nome usando destructuring no array
            const [primeiroNome] = nome.split(' ');
            setUsuarioNome(primeiroNome);
        }
    }, []);

    return (
        <div id="inicio">
            <section id="header">
                <div>
                    <p className='headerText'>Olá, <strong>{usuarioNome}</strong>!</p>
                    <p className='headerSubtext'>Confira o seu <strong>cronograma</strong> de aulas</p>
                </div>
                <Data data={dataAtual}/>
            </section>
            <section id="container-horario"><Cronograma /></section>
            <section id="container-redacao"><ProgressRedacoes /></section>
            <section id="container-faltas"><ProgressPresenca /></section>
            <aside><Teacher /></aside>
        </div>
    );
}

export default Inicio;
