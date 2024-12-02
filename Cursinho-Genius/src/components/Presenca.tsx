import Data from './Data';
import Teacher from './Professores';

const Presenca: React.FC = () => {
    const dataAtual = new Date();

    return (
        <div id="informacoes">
            <section id="header">
                <div>
                    <p className='headerText'>Presença</p>
                    <p className='headerSubtext'>Visualize a presença de <strong>todos os alunos</strong></p>
                </div>
                <Data data={dataAtual} />
            </section>
            <section id="container-informacoes">
            </section>
            <aside><Teacher /></aside>
        </div>
    );
};

export default Presenca;
