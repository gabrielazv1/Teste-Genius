import '../App.css';

function Cronograma() {
    return (
        <div id='redacao'>
            <div className='textHeader'>
                <i className='fa-solid fa-user-check'></i>
                <p>Presença</p>
            </div>
            <section>
            </section>
            <div className='boxFooter'>
                <p className='footerTittle'>Você possui <strong>5% de falta</strong></p>
                <p className='footerSubtittle'>Não atinja <strong>25% de falta</strong>,  isso poderá te fazer perder sua bolsa</p>
            </div>
        </div>
    );
}

export default Cronograma;
