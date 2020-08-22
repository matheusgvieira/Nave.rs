import React from 'react';

import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { Dispatch } from 'redux';
import { toggle } from '../../store/ducks/modal/actions';

import './styles.css';

interface ModalProps {
    modalKey: boolean;
    toggleModal(modalkey: boolean): void;
}

const Modal: React.FC<ModalProps> = ({ toggleModal, children }) => {    

    function handleCloseModal() {
        toggleModal(false);
    }

    return(
        <div className="modal-container">
            <div className="modal-child">
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Modal);