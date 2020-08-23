import React from 'react';

import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { Dispatch } from 'redux';
import { toggle } from '../../store/ducks/modal/actions';

import './styles.css';

interface ModalProps {
    modalKey: boolean;
    id: string;
    toggleModal(modalkey: boolean, id: string): void;
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
  
export default connect(mapStateToProps,mapDispatchToProps)(Modal);