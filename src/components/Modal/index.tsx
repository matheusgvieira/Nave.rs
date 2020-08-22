import React from 'react';

import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { Dispatch } from 'redux';
import { toggle } from '../../store/ducks/modal/actions';

import './styles.css';

interface ModalProps {
    modalKey: boolean;
    toggleModal(modalkey: boolean): void;
    type: string;
    content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {    

    
    return(
        <div className="modal-container">
            <div className="modal-child">
                <main  id={props.type}>
                    {props.content}
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