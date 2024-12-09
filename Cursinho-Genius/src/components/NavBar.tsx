import React, { useState, useEffect } from 'react';
import SenhoraGif from '../assets/Senhora_GIF.gif';
import Logo from '../assets/Logo Genius.png';
import '../App.css';
import Inicio from './Inicio';
import Informacoes from './Informacoes';
import Configuracoes from './Configuracoes';
import Aluno from './Aluno';
import Presenca from './Presenca';
import Chamada from './Chamada/Chamada';

const NavBar: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState<string>('Ínicio');
    const [isLogOffVisible, setIsLogOffVisible] = useState<boolean>(false);
    const [usuarioNome, setUsuarioNome] = useState<string>('');
    const [usuarioTipo, setUsuarioTipo] = useState<string>('');
    const [isChamadaVisible, setIsChamadaVisible] = useState<boolean>(false);

    useEffect(() => {
        const nome = localStorage.getItem('usuarioNome');
        const tipo = localStorage.getItem('usuarioTipo');

        if (nome && tipo) {
            setUsuarioNome(nome);
            setUsuarioTipo(tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase());
        }

        const handleClickOutside = (event: MouseEvent) => {
            const profileSection = document.querySelector('.student_profile');
            if (profileSection && !profileSection.contains(event.target as Node)) {
                setIsLogOffVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const renderPage = () => {
        switch (selectedPage) {
            case 'Ínicio':
                return <Inicio />;
            case 'Informações':
                return <Informacoes />;
            case 'Configurações':
                return <Configuracoes />;
            case 'Aluno':
                return <Aluno />;
            case 'Presença':
                return <Presenca />;
            default:
                return null;
        }
    };

    const logOff = () => {
        try {
            localStorage.clear();
            console.log('authToken removido com sucesso.');
            window.location.reload();
        } catch (error) {
            console.error('Erro ao realizar logoff:', error);
        }
    };

    const startChamada = () => {
        setIsChamadaVisible(true);
    };

    const finalizarChamada = () => {
        setIsChamadaVisible(false);
    };

    const renderAdminNavbar = () => (
        <aside id="navbar">
            <img id="logoNavBar" src={Logo} alt="Logo" />
            <section id="nav_actions">
                <div className="nav_button" onClick={() => setSelectedPage('Ínicio')}>
                    <i className="fa-solid fa-house"></i>
                    <p>Ínicio</p>
                </div>
                <div className="nav_button" onClick={() => setSelectedPage('Aluno')}>
                    <i className="fa-solid fa-user"></i>
                    <p>Alunos</p>
                </div>
                <div className="nav_button" onClick={() => setSelectedPage('Presença')}>
                    <i className="fa-solid fa-calendar-days"></i>
                    <p>Presença</p>
                </div>
                <div className="nav_button" onClick={() => setSelectedPage('Configurações')}>
                    <i className="fa-solid fa-gear"></i>
                    <p>Configurações</p>
                </div>
                <button id="buttonChamada" onClick={startChamada}>Chamada</button>
            </section>
            <div>
                <img src={SenhoraGif} id="senhora_gif" draggable="false" alt="Senhora" />
            </div>
            {isLogOffVisible && (
                <section
                    id="logOff"
                    className="nav_button"
                    onClick={(event) => {
                        event.stopPropagation();
                        setIsLogOffVisible(false);
                        logOff();
                    }}
                >
                    <i className="fa-solid fa-sign-out-alt"></i>
                    <p>Sair</p>
                </section>
            )}
            <section
                className="student_profile"
                onClick={() => setIsLogOffVisible(!isLogOffVisible)}
            >
                <div className="profile_pic"></div>
                <div>
                    <p className="profile_name">{usuarioNome}</p>
                    <p className="ocupation">{usuarioTipo}</p>
                </div>
            </section>
        </aside>
    );

    const renderDefaultNavbar = () => (
        <aside id="navbar">
            <img id="logoNavBar" src={Logo} alt="Logo" />
            <section id="nav_actions">
                <div className="nav_button" onClick={() => setSelectedPage('Ínicio')}>
                    <i className="fa-solid fa-house"></i>
                    <p>Ínicio</p>
                </div>
                <div className="nav_button" onClick={() => setSelectedPage('Informações')}>
                    <i className="fa-solid fa-circle-info"></i>
                    <p>Informações</p>
                </div>
                <div className="nav_button" onClick={() => setSelectedPage('Configurações')}>
                    <i className="fa-solid fa-gear"></i>
                    <p>Configurações</p>
                </div>
            </section>
            <div>
                <img src={SenhoraGif} id="senhora_gif" draggable="false" alt="Senhora" />
            </div>
            {isLogOffVisible && (
                <section
                    id="logOff"
                    className="nav_button"
                    onClick={(event) => {
                        event.stopPropagation();
                        setIsLogOffVisible(false);
                        logOff();
                    }}
                >
                    <i className="fa-solid fa-sign-out-alt"></i>
                    <p>Sair</p>
                </section>
            )}
            <section
                className="student_profile"
                onClick={() => setIsLogOffVisible(!isLogOffVisible)}
            >
                <div className="profile_pic"></div>
                <div>
                    <p className="profile_name">{usuarioNome}</p>
                    <p className="ocupation">{usuarioTipo}</p>
                </div>
            </section>
        </aside>
    );

    return (
        <div>
            {usuarioTipo === 'Admin' ? renderAdminNavbar() : renderDefaultNavbar()}
            <main>
                {renderPage()}
                {isChamadaVisible && <Chamada finalizarChamada={finalizarChamada} />}
            </main>
        </div>
    );
};

export default NavBar;
