import React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ApplicationState } from '../../store';
import { toggle } from '../../store/ducks/modal/actions';

import trashIcon from '../../assets/images/icons/trash.svg';
import editIcon from '../../assets/images/icons/edit.svg';

import './styles.css';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

interface UserNaver {
    id: string;
    job_role: string;
    admission_date: Date;
    birthdate: Date;
    project: string;
    name: string;
    url: string;
}

interface NaverProps{
    modalKey: boolean;
    id: string;
    toggleModal(modalkey: boolean, id: string): void;
    UserNaver: UserNaver;
    setModalDelete(open: boolean): void;
}

interface User {
    email: string;
    password: string;
    token: string;
}

const Naver: React.FC<NaverProps> = ({ modalKey, toggleModal, setModalDelete, UserNaver }) => { 

    const user:User = JSON.parse(localStorage.getItem('user')!);
    const history = useHistory(); 

    function handleOpenModal(){
        toggleModal(true, UserNaver.id);
    }

    function handleEditNaver(){
        toggleModal(false, UserNaver.id);
        history.push('/adicionar-naver');
    }

    function handleDeleteNaver(){
        api.delete(`/navers/${UserNaver.id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
        .then(() => {
            setModalDelete(true);
        })
        .catch(() => {
            alert('Erro ao deletar o Naver');
        })
    }

    return (
        <div className="naver-container">
            <div className="img-naver">
                <img src={UserNaver.url} alt="Naver" onClick={handleOpenModal}/>
            </div>
            <div className="description">
                <strong>{UserNaver.name}</strong>
                <p>{UserNaver.job_role}</p>
            </div>
            <div className="icons">
                <button type="button">
                    <img src={trashIcon} alt="Excluir" onClick={handleDeleteNaver} />
                </button>
                <button type="button">
                    <img src={editIcon} alt="Editar" onClick={handleEditNaver} />
                </button>                
            </div>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Naver);