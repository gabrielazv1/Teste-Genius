import React, { useState } from 'react';
import '../App.css';
import Data from './Data';
import Teacher from './Teacher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const Informacoes: React.FC = () => {
    const dataAtual = new Date();
    // Mantendo o índice da div que deve estar aberta
    const [indiceAberto, setIndiceAberto] = useState<number | null>(null);

    // Função para alternar o estado de exibição do texto
    const alternarTexto = (index: number) => {
        setIndiceAberto(indiceAberto === index ? null : index); // Alterna o índice
    };

    const informacoes = [
        {
            id: 1,
            texto: 'Dúvidas sobre a entrega das redações',
            detalhes: 'No cursinho comunitário Genius, o aluno deve entregar todas as redações dentro dos prazos estabelecidos. Contudo, entende-se que podem surgir imprevistos. Assim, o aluno pode deixar de entregar até duas redações sem prejuízo imediato. No entanto, ao atingir três redações não entregues, ele corre o risco de perder a bolsa de estudos. Essa regra visa incentivar o comprometimento e a responsabilidade acadêmica, mas existe a possibilidade de dialogar com a coordenação. Em casos específicos e justificáveis, o aluno pode solicitar uma reavaliação das faltas de entrega para evitar a perda da bolsa, demonstrando seu interesse em recuperar a regularidade.'
        },
        {
            id: 2,
            texto: 'Quantas faltas eu posso ter?',
            detalhes: 'No Cursinho Comunitário Genius, o aluno pode ter até 25% de faltas sem risco de perder a bolsa de estudos. Caso ultrapasse esse limite, a bolsa poderá ser comprometida. Essa regra visa garantir o comprometimento e a presença do aluno nas atividades, fundamentais para o seu bom desempenho. No entanto, em situações excepcionais e justificáveis, o aluno pode entrar em contato com a coordenação para avaliar o caso. A coordenação estará aberta a reavaliar a situação, levando em conta o empenho do aluno em regularizar sua presença.'
        },
        {
            id: 3,
            texto: 'Como funciona os simulados?',
            detalhes: 'Os simulados no Cursinho Comunitário Genius acontecem uma vez por ano e seguem a mesma logística do Enem. Os alunos têm o mesmo prazo para a realização da prova, simulando da melhor forma possível as condições do exame real. Essa dinâmica tem como objetivo preparar os alunos para o Enem, proporcionando uma experiência mais próxima do que será vivenciado no dia da prova.'
        },
        {
            id: 4,
            texto: 'Dúvidas sobre o acompanhamento pedagógico',
            detalhes: 'O acompanhamento pedagógico é feito de forma contínua, com avaliações periódicas para medir o progresso do aluno. O suporte é oferecido pelos professores e pela coordenação do curso.'
        }
    ];

    return (
        <div id="informacoes">
            <section id="header">
                <div>
                    <p className='headerText'>Informações</p>
                    <p className='headerSubtext'>Fique <strong>por dentro</strong> de tudo!</p>
                </div>
                <Data data={dataAtual} />
            </section>
            <section id="container-informacoes">
                {informacoes.map((info, index) => (
                    <div
                        key={info.id}
                        className={`informacaoText ${indiceAberto === index ? 'expanded' : ''}`} // Alterna a classe expanded
                        onClick={() => alternarTexto(index)} // Passa o índice da div clicada
                    >
                        <div className='mainText'>
                            <p>{info.texto}</p>
                            <FontAwesomeIcon icon={indiceAberto === index ? faAngleUp : faAngleDown} />
                        </div>
                        {indiceAberto === index && (
                            <div className='info'>
                                <p>{info.detalhes}</p>
                            </div>
                        )}
                    </div>
                ))}
            </section>
            <aside><Teacher /></aside>
        </div>
    );
};

export default Informacoes;
