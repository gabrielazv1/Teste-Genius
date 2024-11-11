import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            const response = await fetch('https://cursinho-genius.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });
    
            console.log('Status:', response.status);  // Log do status da resposta
            const data = await response.json();  // Obtenha a resposta em JSON
            console.log('Response Body:', data); // Log do corpo da resposta
    
            if (response.ok) {
                alert('Login efetuado');
            } else {
                alert(`Falha ao efetuar o login: ${data.message || 'Erro desconhecido'}`);
            }
        } catch (error) {
            console.error('Erro ao fazer login', error);
            alert('Erro ao fazer login. Tente novamente');
        }
    };
    

    return (
        <div id="login">
            <section id="input">
                <div id="textHeader">
                    <p id="tittle">Bem vindo(a)!</p>
                    <p id="subtittle">Faça o seu <strong>login</strong> para ter acesso ao sistema</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={mostrarSenha ? 'text' : 'password'}
                            id="senha"
                            name="senha"
                            required
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                            className="senha-toggle"
                            style={{
                                background: 'none',
                                border: 'none',
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={mostrarSenha ? faEyeSlash : faEye}
                                style={{ color: '#003D4E' }}
                            />
                        </button>
                    </div>
                    <button type="submit">Fazer login</button>
                </form>
            </section>
        </div>
    );
}

export default Login;
