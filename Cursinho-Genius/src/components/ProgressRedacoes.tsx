import '../App.css';

import { SemiCircleProgress } from 'react-semicircle-progressbar';

function Cronograma() {
    return (
        <div>
            <div className='textHeader'>
            <i className="fa-solid fa-file"></i>
                <p>Redações</p>
            </div>
            <section>
            <SemiCircleProgress
                    percentage={100}
                    size={{
                        width: 300,
                        height: 200,
                    }}
                    strokeWidth={15}
                    strokeColor="#00A69A"
                />
            </section>
            <div className='boxFooter'>
                    <p className='footerTittle'>Você possui <strong>1 redação</strong> não entregues</p>
                    <p className='footerSubtittle'>Não atinja <strong>3 redações</strong>, pois isso poderá te fazer perder sua bolsa</p>
            </div>
        </div>
    );
}

export default Cronograma;
