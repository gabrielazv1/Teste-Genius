import Data from './Data';
import React, { useState, useEffect, useRef } from "react";
import Teacher from './Professores';
import { TipoUsuarioEnum, AnoLetivo } from '../models/Objetos';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Configuracoes: React.FC = () => {
    const dataAtual = new Date();

    const isAdmin: boolean = localStorage.getItem('usuarioTipo') == String(TipoUsuarioEnum.ADMIN);

    const [inputInativo, setInputInativo] = useState<boolean>(true);
    const [anosLetivos, setAnosLetivos] = useState<AnoLetivo[]>([]);
    const [podeEditar, setPodeEditar] = useState<boolean>(false);
    const [anoLetivoAtual, setAnoLetivoAtual] = useState<AnoLetivo | undefined | null>();
    const [open, setOpen] = React.useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [diasLetivos, setDiasLetivos] = useState<number | undefined | null>();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valor = event.target.value;
        setDiasLetivos(valor ? Number(valor) : undefined);
    };
   
    useEffect(()=>{
        verificaAnoAtualIsVigente();
    }, [])

    useEffect(() => {
        const encontrado = anosLetivos.find(al => al.status == "ATIVO");
        setAnoLetivoAtual(encontrado);
        setDiasLetivos(anoLetivoAtual?.diasLetivos);
        anoLetivoAtual? setPodeEditar(true): setPodeEditar(false)
    }, [anosLetivos]);

    async function getAnosLetivo(){
        try {
          const response = await fetch(`https://cursinho-genius.onrender.com/anoLetivo/listar`, {
            method: "GET",
          });
          if (!response.ok) {
            throw new Error(`Erro ao buscar anos letivo: ${response.statusText}`);
          }
          const anosLetivos = toAnoLetivoList(await response.json());
          setAnosLetivos(anosLetivos);
        } catch (error) {
          console.error("Erro ao exibir candidatos", error);
        }
    }

    async function criarAnoLetivo(){
        if (!diasLetivos || diasLetivos <= 0) {
            alert("Informe um número válido para os dias letivos.");
            return;
        }
        try {
          const response = await fetch(`https://cursinho-genius.onrender.com/anoLetivo/criar?diasLetivos=${diasLetivos}`, {
            method: "POST",
          });

          var novo = await response.json();
          setAnoLetivoAtual(toAnoLetivoClass(novo));

          if (!response.ok) {
            throw new Error(`Erro ao criar ano letivo: ${response.statusText}`);
          }
        } catch (error) {
          alert("Erro ao criar ano letivo.")
        }
    }

    async function fetchEncerrarAnoLetivo(){
        try {
          const response = await fetch(`https://cursinho-genius.onrender.com/anoLetivo/encerrar`, {
            method: "POST",
          });
          if (!response.ok) {
            throw new Error(`Erro ao criar ano letivo: ${response.statusText}`);
          }
        } catch (error) {
          alert(error)
        }
    }

    async function atualizarAnoLetivo(){
        if(!diasLetivos) {
            alert("Dias letivos precisam ser informados.");
            return;
        }
        try {
          const response = await fetch(`https://cursinho-genius.onrender.com/anoLetivo/editar?id=${anoLetivoAtual?.id}&diasLetivos=${diasLetivos}`, {
            method: "PUT",
          });

          if (!response.ok) {
            throw new Error(`Erro ao editar ano letivo: ${response.statusText}`);
          }
        } catch (error) {
          alert("Erro ao editar ano letivo.")
        }
    }

    async function verificaAnoAtualIsVigente(){
         await getAnosLetivo();
    }

    function toAnoLetivoList(data: any[]): AnoLetivo[] {
        return data.map((item) => (
            new AnoLetivo(item.id, item.ano, item.inicio, item.termino, item.anosLetivos, item.status)
        ));
    }

    function toAnoLetivoClass(item: any): AnoLetivo{
        return new AnoLetivo(item.id, item.ano, item.inicio, item.termino, item.diasLetivos, item.status);
    }

    const encerrarAnoLetivo = () =>{
        fetchEncerrarAnoLetivo();
        setPodeEditar(false);
        inativarInput();
        setAnoLetivoAtual(null);
        setDiasLetivos(null);
        handleClose();
    }

    const iniciarCriacaoAnoLetivo = ()=>{
        ativarInput();
        setPodeEditar(true);
    }
    const AnoLetivoButton = () =>{
            if(anoLetivoAtual) return (<Button variant="outlined" onClick={handleOpen}>Encerrar ano letivo {dataAtual.getFullYear()}</Button>)
            return <Button variant="contained" onClick={iniciarCriacaoAnoLetivo}>Iniciar ano letivo de {dataAtual.getFullYear()}</Button>
    }
    const ativarInput = () => {
        setInputInativo(false)
        inputRef.current!.focus();
    };
    const inativarInput = () => setInputInativo(true);

    const mudarIcon = ()=>{
        if(!podeEditar) return null;

        if(inputInativo) return  (
            <div>
                <IconButton aria-label="delete">
                    <EditIcon onClick={ativarInput}/>
                </IconButton>
            </div>
        )

        return (
        <div className='diasLetivosActions'>
            <FontAwesomeIcon
                icon={faCircleCheck}
                style={{
                    color: "#00A69A",
                    cursor: "pointer",
                    marginRight: "10px",
                    fontSize: "35px",
                }}
                targetX={"Salvar"}
                textDecoration={"teste"}
                textRendering={"Carregando"}
                onClick={salvarAlteracao}
                />
                <FontAwesomeIcon
                icon={faCircleXmark}
                style={{
                    color: "#6755AA",
                    cursor: "pointer",
                    fontSize: "35px",
                }}
                onClick={cancelarAlteracao}
                />
        </div>
        )    
    }
    const salvarAlteracao = ()=>{
        inativarInput();
        if(anoLetivoAtual) {
            inativarInput();
            atualizarAnoLetivo()
        }
        else{
            criarAnoLetivo();
        }

        //se tiver ano atual, vai fazer requisição de alterar dias letivos
    }
    const cancelarAlteracao = ()=>{
        inativarInput();
        setDiasLetivos(anoLetivoAtual?.diasLetivos);
        if(!anoLetivoAtual) setPodeEditar(false);
    }
    const carregarDiasLetivos = () => {
        if(isAdmin){
            return (
                <div className='diasLetivos'>
                    <div className='diasLetivosInput'>
                        {AnoLetivoButton()}
                        <TextField
                            onChange={handleChange}
                            ref={inputRef}
                            id="outlined-number"
                            size="small" 
                            label="Dias letivos"
                            type="number"
                            variant="outlined" 
                            disabled = {inputInativo}
                            slotProps={{
                                inputLabel: {
                                shrink: true,
                                },
                            }}
                            value={diasLetivos}
                        />
                        {mudarIcon()}
                    </div>
                </div>
            );
        }
        return null;
    }

    return (
        <div id="informacoes">
            {}
            <section id="header">
                <div>
                    <p className='headerText'>Configurações</p>
                    <p className='headerSubtext'>Configure o site para uma <strong>melhor experiência</strong></p>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                            Tem certeza que deseja encerrar o ano letivo de {dataAtual.getFullYear()}?
                            </Typography>
                            <br />
                            <Button variant="contained" size="large" onClick={encerrarAnoLetivo}>Confirmar encerramento</Button>
                        </Box>
                    </Modal>
                </div>
                <Data data={dataAtual} />
            </section>
            <section id="container-informacoes">
                {carregarDiasLetivos()}
            </section>
            <aside><Teacher /></aside>
        </div>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
  };

export default Configuracoes;

