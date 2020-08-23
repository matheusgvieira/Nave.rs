import React, { useState, FormEvent, useEffect } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';

import moment from 'moment';

import backIcon from '../../assets/images/icons/back.svg';
import closeIcon from '../../assets/images/icons/close.svg';

import api from '../../services/api';

import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';

interface User {
    email: string;
    password: string;
    token: string;
}

interface AddNaverProps{
    id: string;
}

interface UserNaver {
    id: string;
    job_role: string;
    admission_date: Date;
    birthdate: Date;
    project: string;
    name: string;
    url: string;
}

const AddNaver: React.FC<AddNaverProps> = ({ id }) => {
    const [name, setName] = useState<string>('');
    const [office, setOffice] = useState<string>('');
    const [idade, setIdade] = useState<number>(0);
    const [companyTime, setCompanyTime] = useState<number>(0);
    const [projectsParticipated, setProjectsParticipated] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const user:User = JSON.parse(localStorage.getItem('user')!); 
    const [userNavers, setUserNavers] = useState<UserNaver[]>([]);
    
    const history = useHistory();

    useEffect(() => {
        api.get('/navers', {
            headers: { Authorization: `Bearer ${user.token}` }
        })
        .then((response) => {
            setUserNavers(response.data)
          })
        .catch((error) => {
            console.error(error);
        })
    }, []);
    
    async function createNaver(e: FormEvent){
        e.preventDefault();
            const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        const admission_date = moment().format('DD/MM') +  '/' + (parseInt(moment().format('YYYY')) - companyTime);
        const birthdate = moment().format('DD/MM') +  '/' + (parseInt(moment().format('YYYY')) - idade);        
        console.log({
            admission_date,
            birthdate,
        })
        
        await api.post('/navers', {
            job_role: office,
            admission_date,
            birthdate,
            project: projectsParticipated,
            name,
            url: avatar,
        }, config).then(() => {
            setOpenModalCreate(true);
        }).catch((error) =>{
            alert('Erro ao criar o usuário');
        });
    }
    
    function handleBackHome(){
        history.push('/home');
    }

    function handleCloseModal() {
        setOpenModalCreate(false);
        history.push('/adicionar-naver');
    }

    const userCurrent = id  !== '' ? userNavers.find((object: UserNaver) => object.id === id) : null;

    const oldCurrent = userCurrent?.admission_date !== undefined ?
                moment().year() - parseInt((userCurrent?.birthdate)?.toString().split('-')[0]) 
                : 0;

    const companyTimeCurrent = userCurrent?.admission_date !== undefined ?
                moment().year() - parseInt((userCurrent.admission_date)?.toString().split('-')[0]) 
                : 0;
    
    return (
        <div className="add-naver-container">
            {openModalCreate && (
                <Modal type="alert" content={
                    <div className="modal-create">
                        <div className="title-modal-create">
                            <h1>Naver Criado</h1>
                            <img src={closeIcon} alt="Icone de Fechar modal" onClick={handleCloseModal}/>
                        </div>
                        <div className="text">
                            <p>Naver criado com sucesso!</p>
                        </div>
                    </div>
                } /> 
            )}
            {openModalUpdate && (
                <Modal type="alert" content={
                    <div className="modal-create">
                        <div className="title-modal-create">
                            <h1>Naver Atualizado</h1>
                            <img src={closeIcon} alt="Icone de Fechar modal" onClick={handleCloseModal}/>
                        </div>
                        <div className="text">
                            <p>Naver criado com sucesso!</p>
                        </div>
                    </div>
                } /> 
            )}
            <header>
                <Header />
            </header>

            <main>
               <div className="form-naver">
                    <div className="title">
                        <button type="button" onClick={handleBackHome}>
                            <img src={backIcon} alt="Botão de Voltar"/>
                        </button>
                        <h1>Adicionar Naver</h1>
                    </div>
                    <form onSubmit={createNaver}>
                        <div className="input-field">
                            <Input 
                                label="Nome" 
                                name="name" 
                                placeholder="Nome"
                                onChange={e => setName(e.target.value)} 
                                defaultValue={userCurrent?.name}
                            />
                            <Input 
                                label="Cargo" 
                                name="office" 
                                placeholder="Cargo"
                                onChange={e => setOffice(e.target.value)}
                                defaultValue={userCurrent?.job_role} 
                            />
                            <Input 
                                label="Idade" 
                                name="old" 
                                placeholder="Idade"
                                onChange={e => setIdade(+e.target.value)}
                                defaultValue={oldCurrent === 0 ? '' : oldCurrent}  
                            />
                            <Input 
                                label="Tempo de Empresa" 
                                name="company-time" 
                                placeholder="Tempo de Empresa"
                                onChange={e => setCompanyTime(+e.target.value)}
                                defaultValue={companyTimeCurrent === 0 ? '' : companyTimeCurrent} 
                            />
                            <Input 
                                label="Projetos que participou" 
                                name="projects-participated" 
                                placeholder="Projetos que participou"
                                onChange={e => setProjectsParticipated(e.target.value)}
                                defaultValue={userCurrent?.project} 
                            />
                            <Input 
                                label="URL da foto do naver" 
                                name="avatar"
                                placeholder="URL da foto do naver"
                                onChange={e => setAvatar(e.target.value)}  
                            />
                        </div>
                        <div className="button-container">
                            <Button value="Salvar" type="submit"/>
                        </div>
                    </form>
               </div>
            </main>
        </div>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    id: state.modal.id,
});

  
export default connect(mapStateToProps)(AddNaver);