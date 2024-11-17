import '../App.css';
import Data from './Data';
import Teacher from './Teacher';

const Editar: React.FC = () => {
    const dataAtual = new Date();

    return (
        <div id="informacoes">
            <section id="header">
                <div>
                    <p className='headerText'>Edição</p>
                    <p className='headerSubtext'>Edite as <strong>informações</strong> do seu perfil</p>
                </div>
                <Data data={dataAtual} />
            </section>
            <section id="container-informacoes">
            </section>
            <aside><Teacher /></aside>
        </div>
    );
};

export default Editar;
