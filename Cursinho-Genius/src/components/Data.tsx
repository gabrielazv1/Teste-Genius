import React from 'react';
import '../App.css';

interface HeaderProps {
    data: Date;
}

const Data: React.FC<HeaderProps> = ({data }) => {

    const dia = data.getDate();
    let mes = data.toLocaleString('pt-BR', { month: 'long' });
    const ano = data.getFullYear();

    function capitalizeFirstLetter(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    mes = capitalizeFirstLetter(mes);

    return (
        <div id='data'>
            <p className='headerText'>{dia} de <strong>{mes}</strong></p>
            <p className='headerSubtext'>{ano}</p>
        </div>
    );
}

export default Data;
