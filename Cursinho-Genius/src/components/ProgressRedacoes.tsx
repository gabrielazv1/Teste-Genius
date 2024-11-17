import '../App.css';

function Cronograma() {
    return (
        <div>
            <div className='textHeader'>
                <i className="fa-solid fa-file"></i>
                <p>Redações</p>
            </div>
            <section>
            </section>
            <div className='boxFooter'>
                <p className='footerTittle'>Você possui <strong>1 redação</strong> não entregues</p>
                <p className='footerSubtittle'>Não atinja <strong>3 redações</strong>, pois isso poderá te fazer perder sua bolsa</p>
            </div>
        </div>
    );
}

export default Cronograma;
