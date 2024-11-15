import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Associacao from '../assets/logoassociacao.png';
import Logo from '../assets/Logo.png';

interface LoginProps {
    onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const usuario = localStorage.getItem('usuario');
        if (token && usuario) {
            onLogin();
        }
    }, [onLogin]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('https://cursinho-genius.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (response.ok) {
                // Armazena o token e o usuário no localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('usuario', JSON.stringify(data.usuario));
                
                alert(`Bem vindo, ${data.usuario.nome}!`);
                onLogin();
            } else {
                alert('Erro ao fazer login, verifique seu e-mail ou senha e tente novamente');
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
                            aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
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
                <div id="logosGenius">
                    <div id='userName'><p></p></div>
                    <img src={Associacao} alt="Logo Associação" draggable="false" />
                    <img src={Logo} alt="Logo Genius" draggable="false" />
                </div>
            </section>
        </div>
    );
}

export default Login;
