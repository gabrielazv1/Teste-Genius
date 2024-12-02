import React, { useState } from 'react';
import '../App.css';
import Data from './Data';
import Teacher from './Professores';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const Informacoes: React.FC = () => {
    const dataAtual = new Date();
    const [indiceAberto, setIndiceAberto] = useState<number | null>(null);

    const alternarTexto = (index: number) => {
        setIndiceAberto(indiceAberto === index ? null : index);
    };

    const informacoes = [
        {
            id: 1,
            texto: 'Dúvidas sobre a entrega das redações',
            detalhes: 'Os temas das redações serão disponibilizados semanalmente na plataforma e no grupo de WhatsApp do Cursinho Genius. Cada redação deverá ser entregue na aula subsequente, utilizando a folha padrão fornecida pela instituição. O não cumprimento dessa exigência por mais de duas redações consecutivas, bem como a prática de plágio, serão considerados motivos suficientes para a rescisão do contrato, resultando na exclusão imediata do aluno do curso. Em caso de qualquer dificuldade ou imprevisto, é imprescindível que o aluno procure a Coordenação Pedagógica para informar e solucionar a situação.'
        },
        {
            id: 2,
            texto: 'Quantas faltas eu posso ter?',
            detalhes: 'O aluno compromete-se a comparecer a, no mínimo, 80% das aulas anuais e 75% das aulas mensais, sendo a sua presença devidamente registrada por meio de ferramentas disponibilizadas na plataforma. O descumprimento dessa exigência poderá acarretar advertências por parte da Coordenação Pedagógica do curso. Após a emissão de duas advertências, caso o comportamento desidioso persista, o aluno estará sujeito ao desligamento do curso. No caso de eventuais impedimentos que comprometem a frequência, é imprescindível que o aluno comunique a situação à Coordenação Pedagógica, de forma antecipada, para que as devidas providências possam ser tomadas.'
        },
        {
            id: 3,
            texto: 'Como funciona os simulados?',
            detalhes: 'Durante o período letivo do curso, o aluno terá direito à realização de três simulados, sendo o primeiro aplicado na modalidade online e os dois subsequentes realizados de forma presencial, seguindo o formato aprovado pelo Exame Nacional do Ensino Médio (ENEM). Os simulados visam proporcionar ao aluno uma experiência prática e preparatória, permitindo a familiarização com a dinâmica do exame, além de possibilitar a avaliação de seu desempenho ao longo do curso.'
        },
        {
            id: 4,
            texto: 'Dúvidas sobre o acompanhamento pedagógico',
            detalhes: 'O aluno terá a possibilidade de acompanhar sua assiduidade e o status de entrega das redações diretamente pela plataforma, utilizando seu login e senha pessoal. Além disso, poderá consultar as atividades extraclasse previstas no calendário escolar. Em caso de dúvidas ou para esclarecimentos adicionais, o aluno deverá procurar a Coordenação Pedagógica ou entrar em contato pelo WhatsApp, através do número (37) 9 8826-0874.'
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
                        className={`informacaoText ${indiceAberto === index ? 'expanded' : ''}`}
                        onClick={() => alternarTexto(index)} 
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
