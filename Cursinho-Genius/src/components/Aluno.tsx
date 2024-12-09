import Data from './Data';
import Teacher from './Professores';
import ListarAlunos from './ListarAlunos/ListarAlunos';

const Aluno: React.FC = () => {
    const dataAtual = new Date();

    return (
        <div id="informacoes">
            <section id="header">
                <div>
                    <p className='headerText'>Alunos</p>
                    <p className='headerSubtext'>Visualize todos os aluno <strong>matriculados</strong></p>
                </div>
                <Data data={dataAtual} />
            </section>
            <section id="container-informacoes">
                <ListarAlunos/>
            </section>
            <aside><Teacher /></aside>
        </div>
    );
};

export default Aluno;
