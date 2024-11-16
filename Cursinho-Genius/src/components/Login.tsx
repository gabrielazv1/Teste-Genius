import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Associacao from '../assets/logoassociacao.png';
import Logo from '../assets/Logo.png';

interface LoginProps {
    onLogin: () => void;
}

interface FormErrors {
    nome?: string;
    rg?: string;
    cpf?: string;
    telefone?: string;
    pai?: string;
    mae?: string;
    nacionalidade?: string;
    naturalidade?: string;
    endereco?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
    email?: string;
    senha?: string;
}

const estadosBrasil = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);
    const [exibirCadastro, setExibirCadastro] = useState<boolean>(false);
    const [carregando, setCarregando] = useState<boolean>(false);
    const [estado, setEstado] = useState<string>('');
    const [formErrors] = useState<FormErrors>({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCarregando(true);
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
                const usuario = data.usuario;
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('usuarioNome', usuario.nome);
                localStorage.setItem('usuarioTipo', usuario.tipoUsuario);
                onLogin();
            } else {
                alert('Erro ao fazer login. Verifique suas credenciais.');
            }
        } catch (error) {
            console.error('Erro ao fazer login', error);
            alert('Erro ao fazer login. Tente novamente.');
        } finally {
            setCarregando(false); // Oculta a tela de carregamento
        }
    };

    const handleCadastroSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nome = document.getElementById('cadastroNome') as HTMLInputElement;
        const rg = document.getElementById('cadastroRG') as HTMLInputElement;
        const cpf = document.getElementById('cadastroCPF') as HTMLInputElement;
        const telefone = document.getElementById('cadastroTel') as HTMLInputElement;
        const pai = document.getElementById('cadastroPai') as HTMLInputElement;
        const mae = document.getElementById('cadastroMae') as HTMLInputElement;
        const nacionalidade = document.getElementById('cadastroMora') as HTMLInputElement;
        const naturalidade = document.getElementById('cadastroNasceu') as HTMLInputElement;
        const endereco = document.getElementById('cadastroEndereco') as HTMLInputElement;
        const numero = document.getElementById('cadastroNumero') as HTMLInputElement;
        const bairro = document.getElementById('cadastroBairro') as HTMLInputElement;
        const cidade = document.getElementById('cadastroCidade') as HTMLInputElement;
        const cep = document.getElementById('cadastroCEP') as HTMLInputElement;
        const email = document.getElementById('cadastroEmail') as HTMLInputElement;
        const senha = document.getElementById('cadastroSenha') as HTMLInputElement;

        if (
            !nome?.value ||
            !rg?.value ||
            !cpf?.value ||
            !telefone?.value ||
            !pai?.value ||
            !mae?.value ||
            !nacionalidade?.value ||
            !naturalidade?.value ||
            !endereco?.value ||
            !numero?.value ||
            !bairro?.value ||
            !cidade?.value ||
            !cep?.value ||
            !email?.value ||
            !senha?.value ||
            !estado
        ) {
            alert('Alguns dados não foram preenchidos, insira para continuar');
            return;
        }
        alert('Pré-cadastro realizado com sucesso!');
    };

    return (
        <div id="login">
            <Backdrop sx={{ color: '#fff', zIndex: 1300 }} open={carregando}>
                <CircularProgress color="inherit" />
            </Backdrop>

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
                <p
                    id="preCadastro"
                    onClick={() => setExibirCadastro(!exibirCadastro)}
                >
                    -Deseja realizar o seu <strong>pré-cadastro?</strong> Clique aqui-
                </p>
                <div id="logosGenius">
                    <img src={Associacao} alt="Logo Associação" draggable="false" />
                    <img src={Logo} alt="Logo Genius" draggable="false" />
                </div>
            </section>

            {exibirCadastro && (
                <section id="fundoCadastro">
                    <section id="cadastro">
                        <section
                            id="cadastroHeader"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div>
                                <p id="cadastroTittle">Pré-Cadastro</p>
                                <p id="cadastroSub">Preencha os dados para poder realizar o seu pré-cadastro</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setExibirCadastro(false)}
                                className="fechar-modal"
                                aria-label="Fechar pré-cadastro"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginLeft: 'auto',
                                }}
                            >
                                <FontAwesomeIcon icon={faXmark} style={{ color: '#003D4E', fontSize: '1.5rem' }} />
                            </button>
                        </section>
                        <section>
                            <form onSubmit={handleCadastroSubmit}>
                                <input type="text" id="cadastroNome" placeholder="Nome" />
                                {formErrors.nome && <span>{formErrors.nome}</span>}

                                <div className="cadastroInput">
                                    <input type="text" id="cadastroRG" placeholder="RG" />
                                    {formErrors.rg && <span>{formErrors.rg}</span>}
                                    <input type="text" id="cadastroCPF" placeholder="CPF" />
                                    {formErrors.cpf && <span>{formErrors.cpf}</span>}
                                    <input type="number" id="cadastroTel" placeholder="Telefone" />
                                    {formErrors.telefone && <span>{formErrors.telefone}</span>}
                                </div>
                                <input type="text" id="cadastroPai" placeholder="Nome do Pai" />
                                {formErrors.pai && <span>{formErrors.pai}</span>}
                                <input type="text" id="cadastroMae" placeholder="Nome da Mãe" />
                                {formErrors.mae && <span>{formErrors.mae}</span>}
                                <div className="cadastroInput">
                                    <input type="text" id="cadastroMora" placeholder="Nacionalidade" />
                                    {formErrors.nacionalidade && <span>{formErrors.nacionalidade}</span>}
                                    <input type="text" id="cadastroNasceu" placeholder="Naturalidade" />
                                    {formErrors.naturalidade && <span>{formErrors.naturalidade}</span>}
                                </div>
                                <div className="cadastroInput">
                                    <input type="text" id="cadastroEndereco" placeholder="Endereço" />
                                    {formErrors.endereco && <span>{formErrors.endereco}</span>}
                                    <input type="text" id="cadastroNumero" placeholder="Nº" />
                                    {formErrors.numero && <span>{formErrors.numero}</span>}
                                    <input type="text" id="cadastroBairro" placeholder="Bairro" />
                                    {formErrors.bairro && <span>{formErrors.bairro}</span>}
                                </div>
                                <div className="cadastroInput">
                                    <input type="text" id="cadastroCidade" placeholder="Cidade" />
                                    {formErrors.cidade && <span>{formErrors.cidade}</span>}
                                    <select
                                        id="cadastroEstado"
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}
                                    >
                                        <option value="" id='selectPH'>Estado</option>
                                        {estadosBrasil.map((sigla) => (
                                            <option key={sigla} value={sigla}>
                                                {sigla}
                                            </option>
                                        ))}
                                    </select>
                                    {formErrors.estado && <span>{formErrors.estado}</span>}
                                    <input type="text" id="cadastroCEP" placeholder="CEP" />
                                    {formErrors.cep && <span>{formErrors.cep}</span>}
                                </div>
                                <div className="cadastroInput">
                                    <input type="email" id="cadastroEmail" placeholder="E-mail" />
                                    {formErrors.email && <span>{formErrors.email}</span>}
                                    <input type="password" id="cadastroSenha" placeholder="Senha" />
                                    {formErrors.senha && <span>{formErrors.senha}</span>}
                                </div>
                                <button type="submit">Realizar Cadastro</button>
                            </form>
                        </section>
                    </section>
                </section>
            )}
        </div>
    );
};

export default Login;
