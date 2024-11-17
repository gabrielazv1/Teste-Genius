import React, { useState, useEffect } from 'react';
import SenhoraGif from '../assets/Senhora_GIF.gif';
import '../App.css';
import Inicio from './Inicio';
import Informacoes from './Informacoes';
import Editar from './Editar';
import Configuracoes from './Configuracoes';

const NavBar: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState<string>('Ínicio');
    const [isLogOffVisible, setIsLogOffVisible] = useState<boolean>(false);
    const [usuarioNome, setUsuarioNome] = useState<string>('');
    const [usuarioTipo, setUsuarioTipo] = useState<string>('');

    useEffect(() => {
        const nome = localStorage.getItem('usuarioNome');
        const tipo = localStorage.getItem('usuarioTipo');
        
        if (nome && tipo) {
            setUsuarioNome(nome);
            setUsuarioTipo(tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase());
        }

        // Função para fechar o logoff quando clicar fora da área do usuário
        const handleClickOutside = (event: MouseEvent) => {
            const profileSection = document.querySelector('.student_profile');
            if (profileSection && !profileSection.contains(event.target as Node)) {
                setIsLogOffVisible(false);
            }
        };

        // Adiciona o event listener
        document.addEventListener('click', handleClickOutside);

        // Limpeza do event listener quando o componente for desmontado
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
            case 'Editar':
                return <Editar />;
            case 'Configurações':
                return <Configuracoes />;
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
                {isLogOffVisible && (
                    <section id='logOff' className="nav_button" onClick={logOff}>
                        <i className="fa-solid fa-sign-out-alt"></i>
                        <p>Sair</p>
                    </section>
                )}
                <section className="student_profile" onClick={() => setIsLogOffVisible(!isLogOffVisible)}>
                    <div className="profile_pic"></div>
                    <div>
                        <p className="profile_name">{usuarioNome}</p>
                        <p className="ocupation">{usuarioTipo}</p>
                    </div>
                </section>
            </aside>
            <main>
                {renderPage()}
            </main>
        </div>
    );
};

export default NavBar;
