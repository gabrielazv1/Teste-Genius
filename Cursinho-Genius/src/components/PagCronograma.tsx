import '../App.css';
import Cronograma from './Cronograma';

function PagCronograma() {
    return (
        <div>
            <div className='textHeader'>
                <i className="fa-solid fa-clock"></i>
                <p>Horários de <strong>aula</strong></p>
            </div>
            <section>
                <Cronograma/>
            </section>
        </div>
    );
}

export default PagCronograma;
