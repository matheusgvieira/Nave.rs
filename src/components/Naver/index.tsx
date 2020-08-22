import React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ApplicationState } from '../../store';
import { toggle } from '../../store/ducks/modal/actions';

import naverImg from '../../assets/images/naver.png';
import trashIcon from '../../assets/images/icons/trash.svg';
import editIcon from '../../assets/images/icons/edit.svg';

import './styles.css';

interface NaverProps{
    modalKey: boolean;
    toggleModal(modalkey: boolean): void;
}

const Naver: React.FC<NaverProps> = ({ modalKey, toggleModal }) => { 
    
    function handleOpenModal(){
        toggleModal(true);
    }
    return (
        <div className="naver-container">
            <img src={naverImg} alt="Naver"/>
            <div className="description">
                <strong>Juliano Reis</strong>
                <p>Front-end Developer</p>
            </div>
            <div className="icons">
                <button type="button">
                    <img src={trashIcon} alt="Excluir"/>
                </button>
                <button type="button">
                    <img src={editIcon} alt="Editar" onClick={handleOpenModal}/>
                </button>                
            </div>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Naver);