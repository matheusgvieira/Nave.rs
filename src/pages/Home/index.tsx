import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ApplicationState } from '../../store';
import { toggle } from '../../store/ducks/modal/actions';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header'
import Button from '../../components/Button';
import Naver from '../../components/Naver';
import Modal from '../../components/Modal';

import trashIcon from '../../assets/images/icons/trash.svg';
import editIcon from '../../assets/images/icons/edit.svg';
import closeIcon from '../../assets/images/icons/close.svg';

import api from '../../services/api';
import moment from 'moment';

import './styles.css';


interface User {
    email: string;
    password: string;
    token: string;
}

interface Question{
    modal: boolean;
    userId: string;
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

interface HomeProps {
    modalKey: boolean;
    id: string;
    toggleModal(modalkey: boolean, id: string): void;
    UserNaver: UserNaver;
}

const Home: React.FC<HomeProps> = ({ modalKey, toggleModal, id, UserNaver }) => {
    const history = useHistory();

    const [openQuestion, setOpenQuestion] = useState<Question>({ userId: '', modal: false });
    const [userNavers, setUserNavers] = useState<UserNaver[]>([]);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const user:User = JSON.parse(localStorage.getItem('user')!); 
    
    const configToken = {
        headers: { Authorization: `Bearer ${user.token}` }
    }    

    useEffect(() => {     
        api.get('/navers', configToken)
        .then((response) => {
            setUserNavers(response.data)
          })
        .catch((error) => {
            console.error(error);
        })
    }, [openModalDelete]);

    
    function handleAddNaver(){
        toggleModal(false,'');
        history.push('/adicionar-naver')
    }

    function handleDeleteNaver(){

        setOpenQuestion({ modal: false, userId: openQuestion.userId });
        
        api.delete(`/navers/${openQuestion.userId}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
        .then(() => {
            setOpenModalDelete(true);
        })
        .catch(() => {
            alert('Erro ao deletar o Naver');
        })
    }
    
    function handleCloseModalDelete() {
        setOpenModalDelete(false);
        setOpenQuestion({ modal: false, userId: ''});
    }

    
    const userClicked = userNavers.find((object: UserNaver) => object.id === id);

    function handleModalDeleteNaver(){
        if(userClicked?.id){
            toggleModal(false, userClicked?.id);
            setOpenQuestion({ modal: true, userId: userClicked?.id});  
        }      
    }

    function handleEditNaver(){
        if(userClicked?.id){
            toggleModal(false, userClicked?.id);
            history.push('/adicionar-naver');
        }
    }

    const old = userClicked?.admission_date !== undefined ?
                moment().year() - parseInt((userClicked?.birthdate)?.toString().split('-')[0]) 
                : 0;

    const companyTime = userClicked?.admission_date !== undefined ?
                moment().year() - parseInt((userClicked.admission_date)?.toString().split('-')[0]) 
                : 0;

    return (
        <div className="navers-container">
            {modalKey && (
                <Modal type="naver" content={
                    <div className="info-naver">
                        <section className="img-naver-modal">
                            <img src={userClicked?.url} alt="Naver Imagem"/>
                        </section>
                        <section className="description-naver">
                            <div className="txt-button">
                                <div className="description-txt">
                                    <h1>{userClicked?.name}</h1>
                                    <p>{userClicked?.job_role}</p>
                                    <strong>Idade</strong>
                                    <p>{old} {old > 1 ? 'anos' : 'ano'}</p>
                                    <strong>Tempo de Empresa</strong>
                                    <p>{companyTime} {companyTime > 1 ? 'anos' : 'ano'} de Nave.rs</p>
                                    <strong>Projetos que participou</strong>
                                    <p>{userClicked?.project}</p>
                                </div>
                                <div className="close-button">
                                    <img src={closeIcon} alt="Fechar" onClick={() => toggleModal(false,'')} />
                                </div>
                            </div>

                            <div className="icons">
                                <button type="button">
                                    <img src={trashIcon} alt="Excluir" onClick={handleModalDeleteNaver}/>
                                </button>
                                <button type="button">
                                    <img src={editIcon} alt="Editar" onClick={handleEditNaver} />
                                </button>                
                            </div>
                        </section>
                    </div>
                } />
            )}
            {openQuestion.modal && (
                <Modal type="question" content={
                    <div className="modal-question">
                        <div className="title-question">
                            <h1>Excluir Naver</h1>
                            <p>Tem certeza que deseja excluir esse Naver?</p>
                        </div>
                        <div className="answer">
                            <button type="button" onClick={handleCloseModalDelete}>Cancelar</button>
                            <button type="button" onClick={handleDeleteNaver}>Excluir</button>
                        </div>
                    </div>
                } />
            )}
            {openModalDelete && (
                <Modal type="alert" content={
                    <div className="modal-create">
                        <div className="title-modal-create">
                            <h1>Naver Excluído</h1>
                            <img src={closeIcon} alt="Icone de Fechar modal" onClick={handleCloseModalDelete}/>
                        </div>
                        <div className="text">
                            <p>Naver excluído com sucesso!</p>
                        </div>
                    </div>
                } /> 
            )}
            <header>
                <Header />
            </header>

            <main>
                <div className="title">
                    <h1>Navers</h1>
                    <div className="button-add">
                        <Button value="Adicionar Naver" type="button" onClick={handleAddNaver}/>
                    </div>
                </div>
                <div className="navers">
                    {userNavers.map( 
                        (userNaver: UserNaver) => (
                            <Naver 
                                key={userNaver.id} 
                                UserNaver={userNaver} 
                                setModalQuestion={setOpenQuestion}
                            />
                        )
                    )}
                </div>
            </main>            
        </div>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    modalKey: state.modal.modalKey,
    id: state.modal.id,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return{
        toggleModal(newState: boolean, newId: string){
            const action = toggle(newState, newId);
            dispatch(action);
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);
