import React, { useEffect, useState } from 'react';
import Data from './Data';
import Teacher from './Professores';
import Cronograma from './PagCronograma';
import PreCadastro from './PreCadastro';
import Faltas from './Faltas/Faltas';
import ProgressRedacoes from './Redacao/ProgressRedacoes';

const Inicio: React.FC = () => {
    const [usuarioNome, setUsuarioNome] = useState<string>('');
    const [usuarioTipo, setUsuarioTipo] = useState<string>('');
    const dataAtual = new Date();

    useEffect(() => {
        const nome = localStorage.getItem('usuarioNome');
        const tipo = localStorage.getItem('usuarioTipo');

        if (nome && tipo) {
            const [primeiroNome] = nome.split(' ');
            setUsuarioNome(primeiroNome);
            setUsuarioTipo(tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase());
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

            {usuarioTipo === 'Admin' ? (
                <section id="container-precadastro"><PreCadastro /></section>
            ) : (
                <>
                    <section id="container-redacao"><ProgressRedacoes /></section>
                    <section id="container-faltas"><Faltas/></section>
                </>
            )}

            <aside><Teacher /></aside>
        </div>
    );
}

export default Inicio;
