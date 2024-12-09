import Data from './Data';
import ListagemDeFaltas from './ListagemDeFaltas';

const Presenca: React.FC = () => {
    const dataAtual = new Date();

    return (
        <div id="presenca">
            <section id="header">
                <div>
                    <p className='headerText'>Presença</p>
                    <p className='headerSubtext'>Visualize a presença de <strong>todos os alunos</strong></p>
                </div>
                <Data data={dataAtual} />
            </section>
            <section id="container-presenca">
                <ListagemDeFaltas/>
            </section>
        </div>
    );
};

export default Presenca;
