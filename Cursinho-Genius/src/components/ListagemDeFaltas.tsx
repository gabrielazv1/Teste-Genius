import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

interface Chamada {
    id: number;
    data: string;
    matricula: number;
    aluno: string;
    ano: number;
    presenca: boolean;
}

interface Aluno {
    id: number;
    nome: string;
    chamadas: Chamada[];
}

interface ApiResponse {
    dias: number[];
    alunos: Aluno[];
}

const ListagemDeFaltas = () => {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [mes, setMes] = useState<number>(12);
    const [ano, setAno] = useState<number>(2024);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const gerarDiasDoMes = (mes: number, ano: number) => {
        const ultimoDia = new Date(ano, mes, 0).getDate();
        return Array.from({ length: ultimoDia }, (_, i) => i + 1);
    };

    const formatarDia = (dia: number) => String(dia).padStart(2, "0");

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `https://cursinho-genius.onrender.com/chamada/listar/agrupado?mes=${mes}&ano=${ano}`
                );
                const data: ApiResponse = await response.json();
                setAlunos(data.alunos);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [mes, ano]);

    const diasDoMes = gerarDiasDoMes(mes, ano);

    const handleMesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMes(Number(e.target.value));
    };

    const handleAnoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAno(Number(e.target.value));
    };

    const gerarAnos = () => {
        const anoAtual = new Date().getFullYear();
        const anos = [];
        for (let i = 2024; i <= anoAtual; i++) {
            anos.push(i);
        }
        return anos;
    };

    return (
        <div className="alunos-presenca">
            {isLoading ? (
                <div className="loading">
                    <CircularProgress sx={{ color: '#00A69A' }} />
                </div>
            ) : (
                <>
                    <table className="presenca-tabela">
                        <thead className="cabecario-tabela-presenca">
                            <tr>
                                <th className="nome-aluno">Nome</th>
                                {diasDoMes.map((dia) => (
                                    <th key={dia}>{formatarDia(dia)}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="conteudo-presenca">
                            {alunos.map((aluno) => (
                                <tr key={aluno.id}>
                                    <td className="nome-aluno">{aluno.nome}</td>
                                    {diasDoMes.map((dia) => {
                                        const dataAtual = `${formatarDia(dia)}/${String(mes).padStart(
                                            2,
                                            "0"
                                        )}/${ano}`;

                                        const chamada = aluno.chamadas.find((c) => c.data === dataAtual);

                                        return (
                                            <td key={dia}>
                                                {chamada ? (chamada.presenca ? "•" : "F") : ""}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="selecionar-periodo">
                        <p>Selecione a <strong>data da chamada:</strong></p>
                        <label>
                            <select value={mes} onChange={handleMesChange}>
                                <option value={1}>Janeiro</option>
                                <option value={2}>Fevereiro</option>
                                <option value={3}>Março</option>
                                <option value={4}>Abril</option>
                                <option value={5}>Maio</option>
                                <option value={6}>Junho</option>
                                <option value={7}>Julho</option>
                                <option value={8}>Agosto</option>
                                <option value={9}>Setembro</option>
                                <option value={10}>Outubro</option>
                                <option value={11}>Novembro</option>
                                <option value={12}>Dezembro</option>
                            </select>
                        </label>
                        <label>
                            <select value={ano} onChange={handleAnoChange}>
                                {gerarAnos().map((anoItem) => (
                                    <option key={anoItem} value={anoItem}>
                                        {anoItem}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

export default ListagemDeFaltas;
