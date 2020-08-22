import React from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ApplicationState } from '../../store';
import { toggle } from '../../store/ducks/modal/actions';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header'
import Button from '../../components/Button';
import Naver from '../../components/Naver';
import Modal from '../../components/Modal';

import naverImg from '../../assets/images/naver.png';
import trashIcon from '../../assets/images/icons/trash.svg';
import editIcon from '../../assets/images/icons/edit.svg';
import closeIcon from '../../assets/images/icons/close.svg';

import './styles.css';

interface HomeProps {
    modalKey: boolean;
    toggleModal(modalkey: boolean): void;
}

const Home: React.FC<HomeProps> = ({ modalKey, toggleModal }) => {
    const history = useHistory();

    function handleAddNaver(){
        history.push('/adicionar-naver')
    }

    function handleCloseModal() {
        toggleModal(false);
    }


    return (
        <div className="navers-container">
            {modalKey && (
                <Modal>
                    <div className="info-naver">
                        <section className="img-naver">
                            <img src={naverImg} alt="Naver Imagem"/>
                        </section>
                        <section className="description-naver">
                            <div className="txt-button">
                                <div className="description-txt">
                                    <h1>Juliano Reis</h1>
                                    <p>Front-end Developer</p>
                                    <strong>Idade</strong>
                                    <p>Lorem Ipsum</p>
                                    <strong>Tempo de Empresa</strong>
                                    <p>Lorem Ipsum</p>
                                    <strong>Projetos que participou</strong>
                                    <p>Lorem Ipsum</p>
                                </div>
                                <div className="close-button">
                                    <button type="button">
                                        <img src={closeIcon} alt="Fechar" onClick={handleCloseModal} />
                                    </button>
                                </div>
                            </div>

                            <div className="icons">
                                <button type="button">
                                    <img src={trashIcon} alt="Excluir"/>
                                </button>
                                <button type="button">
                                    <img src={editIcon} alt="Editar" />
                                </button>                
                            </div>
                        </section>
                    </div>
                </Modal>
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
                    <Naver />
                    <Naver />
                    <Naver />
                    <Naver />
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);
