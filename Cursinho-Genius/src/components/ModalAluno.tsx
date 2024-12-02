import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "@mui/material/Backdrop";

type FormData = {
    id: number;
    nome: string;
    nomeMae: string;
    nomePai: string;
    cpf: string;
    rg: string;
    email: string;
    nacionalidade: string;
    naturalidade: string;
    endereco: string;
    numero: number;
    bairro: string;
    cidade: string;
    cep: string;
    telefone: string;
};

type ModalAlunoProps = {
    onClose: () => void;
    aluno: FormData;
};

const ModalAluno: React.FC<ModalAlunoProps> = ({ onClose, aluno }) => {
    const [formData, setFormData] = useState<FormData>(aluno);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    return (
        <Backdrop open={true} style={{ zIndex: 1 }}>
            <section id="cadastro">
                <section
                    id="cadastroHeader"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div style={{marginBottom: "10px"}}>
                        <p id="cadastroTittle">Informações Adicionais</p>
                        <p id="cadastroSub">
                            Verifique todos os <strong>dados do aluno</strong>
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="fechar-modal"
                        aria-label="Fechar pré-cadastro"
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            marginLeft: "auto",
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} style={{ color: "#003D4E", fontSize: "1.5rem" }} />
                    </button>
                </section>
                <section>
                    <form>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                        />
                        <div className="cadastroInput">
                            <input
                                type="text"
                                id="rg"
                                placeholder="RG"
                                value={formData.rg}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                id="cpf"
                                placeholder="CPF"
                                value={formData.cpf}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                id="telefone"
                                placeholder="Telefone"
                                value={formData.telefone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <input
                                type="text"
                                id="pai"
                                placeholder="Nome do Pai"
                                value={formData.nomePai}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                id="mae"
                                placeholder="Nome da Mãe"
                                value={formData.nomeMae}
                                onChange={handleInputChange}
                            />
                        <div className="cadastroInput">
                            <input
                                type="text"
                                id="nacionalidade"
                                placeholder="Nacionalidade"
                                value={formData.nacionalidade}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                id="naturalidade"
                                placeholder="Naturalidade"
                                value={formData.naturalidade}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="cadastroInput">
                            <input
                                type="text"
                                id="endereco"
                                placeholder="Endereço"
                                value={formData.endereco}
                                onChange={handleInputChange}
                            />
                            <input
                                style={{ width: '4vw' , textAlign: 'center'}}
                                type="text"
                                id="numero"
                                placeholder="Nº"
                                value={formData.numero.toString()}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                id="bairro"
                                placeholder="Bairro"
                                value={formData.bairro}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="cadastroInput">
                            <input
                                type="text"
                                id="cidade"
                                placeholder="Cidade"
                                value={formData.cidade}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                id="cep"
                                placeholder="CEP"
                                value={formData.cep}
                                onChange={handleInputChange}
                            />
                        </div>
                        <input
                            type="email"
                            id="email"
                            placeholder="E-mail"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <button type="button" id="cadastroButton" onClick={onClose}>
                            Fechar Dados
                        </button>
                    </form>
                </section>
            </section>
        </Backdrop>
    );
};

export default ModalAluno;
