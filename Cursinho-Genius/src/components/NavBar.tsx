import React, { useState } from 'react';
import SenhoraGif from '../assets/Senhora_GIF.gif';
import '../App.css';
import Inicio from './Inicio';
import Informacoes from './Informacoes';
import Editar from './Editar';
import Configuracoes from './Configuracoes';

const NavBar: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState<string>('Ínicio');

    const renderPage = () => {
        switch (selectedPage) {
            case 'Ínicio':
                return <Inicio />;
            case 'Informações':
                return <Informacoes />;
            case 'Editar':
                return <Editar />;
            case 'Configurações':
                return <Configuracoes />;
            default:
                return null;
        }
    }

    return (
        <div>
            <aside id='navbar'>
                <h1>Study</h1>
                <section id="nav_actions">
                    <div className="nav_button" onClick={() => setSelectedPage('Ínicio')}>
                        <i className="fa-solid fa-house"></i>
                        <p>Ínicio</p>
                    </div>
                    <div className="nav_button" onClick={() => setSelectedPage('Informações')}>
                        <i className="fa-solid fa-circle-info"></i>
                        <p>Informações</p>
                    </div>
                    <div className="nav_button" onClick={() => setSelectedPage('Editar')}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <p>Editar</p>
                    </div>
                    <div className="nav_button" onClick={() => setSelectedPage('Configurações')}>
                        <i className="fa-solid fa-gear"></i>
                        <p>Configurações</p>
                    </div>
                </section>
                <div>
                    <img src={SenhoraGif} id="senhora_gif" draggable="false" alt="Senhora" />
                </div>
                <section className="student_profile">
                    <div className="profile_pic"></div>
                    <div>
                        <p className="profile_name">Mariana Lima Duarte</p>
                        <p className="ocupation">Estudante</p>
                    </div>
                </section>
            </aside>
            <main>
                {renderPage()}
            </main>
        </div>
    );
}

export default NavBar;
