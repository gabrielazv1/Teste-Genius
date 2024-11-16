import '../App.css';
import { SemiCircleProgress } from 'react-semicircle-progressbar';

function Cronograma() {
    return (
        <div id='redacao'>
            <div className='textHeader'>
                <i className='fa-solid fa-user-check'></i>
                <p>Presença</p>
            </div>
            <section>
                <SemiCircleProgress
                    percentage={2}
                    size={{
                        width: 400,
                        height: 200,
                    }}
                    strokeWidth={15}
                    strokeColor="#6755AA"
                />
            </section>
            <div className='boxFooter'>
                    <p className='footerTittle'>Você possui <strong>5% de falta</strong></p>
                    <p className='footerSubtittle'>Não atinja <strong>25% de falta</strong>,  isso poderá te fazer perder sua bolsa</p>
            </div>
        </div>
    );
}

export default Cronograma;
