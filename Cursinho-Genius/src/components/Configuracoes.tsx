import '../App.css';
import Data from './Data';
import Teacher from './Teacher';

const Configuracoes: React.FC = () => {
    const dataAtual = new Date();

    return (
        <div id="informacoes">
            <section id="header">
                <div>
                    <p className='headerText'>Configurações</p>
                    <p className='headerSubtext'>Configure o site para uma <strong>melhor experiência</strong></p>
                </div>
                <Data data={dataAtual} />
            </section>
            <section id="container-informacoes">
            </section>
            <aside><Teacher /></aside>
        </div>
    );
};

export default Configuracoes;
