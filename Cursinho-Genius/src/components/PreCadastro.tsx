import TabelaPreCad from './TabelaPreCad';

function PreCadastro() {
    return (
        <div id='redacao'>
            <div className='textHeader'>
                <i className="fa-solid fa-graduation-cap"></i>
                <p>Alunos <strong>pré-cadastrados</strong></p>
            </div>
            <section>
                <TabelaPreCad/>
            </section>
        </div>
    );
}

export default PreCadastro;
