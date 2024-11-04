import React from 'react';
import '../App.css';

interface HeaderProps {
    nome: string;
    data: Date;
}

const Header: React.FC<HeaderProps> = ({ nome, data }) => {

    const dia = data.getDate();
    let mes = data.toLocaleString('pt-BR', { month: 'long' });
    const ano = data.getFullYear();

    function capitalizeFirstLetter(word:string) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    mes = capitalizeFirstLetter(mes);

    return (
        <div>
            <section id="data">
                <div>
                    <p className='header_tittle'>Olá, <strong>{nome}</strong></p>
                    <p className='header_subtittle'>Confira seu <strong>cronograma</strong> de aulas</p>
                </div>
                <div>
                    <p className='header_tittle'>{dia} de <strong>{mes}</strong></p>
                    <p className='header_subtittle'>{ano}</p>
                </div>
            </section>
        </div>
    );
}

export default Header;
