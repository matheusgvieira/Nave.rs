import React, { useState, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ApplicationState } from '../../store';
import { toggle } from '../../store/ducks/modal/actions';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';

import backIcon from '../../assets/images/icons/back.svg';
import closeIcon from '../../assets/images/icons/close.svg';


import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';

interface AddNaverProps {
    modalKey: boolean;
    toggleModal(modalkey: boolean): void;
}

const AddNaver: React.FC<AddNaverProps> = ({ modalKey, toggleModal }) => {
    const [name, setName] = useState<string>('');
    const [office, setOffice] = useState<string>('');
    const [idade, setIdade] = useState<number>();
    const [companyTime, setCompanyTime] = useState<string>('');
    const [projectsParticipated, setProjectsParticipated] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);

    const history = useHistory();

    function createNaver(e: FormEvent){
        e.preventDefault();

        console.log({
            name,
            office,
            idade,
            companyTime,
            projectsParticipated,
            avatar,
        })
        setOpenModalCreate(true);
    }

    function handleBackHome(){
        history.push('/home');
    }

    function handleCloseModal() {
        toggleModal(false);
    }

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
                            />
                            <Input 
                                label="Cargo" 
                                name="office" 
                                placeholder="Cargo"
                                onChange={e => setOffice(e.target.value)} 
                            />
                            <Input 
                                label="Idade" 
                                name="old" 
                                placeholder="Idade"
                                onChange={e => setIdade(+e.target.value)} 
                            />
                            <Input 
                                label="Tempo de Empresa" 
                                name="company-time" 
                                placeholder="Tempo de Empresa"
                                onChange={e => setCompanyTime(e.target.value)} 
                            />
                            <Input 
                                label="Projetos que participou" 
                                name="projects-participated" 
                                placeholder="Projetos que participou"
                                onChange={e => setProjectsParticipated(e.target.value)} 
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
    modalKey: state.modal.modalKey,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => {
    return{
        toggleModal(newState: boolean){
            const action = toggle(newState);
            dispatch(action);
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AddNaver);