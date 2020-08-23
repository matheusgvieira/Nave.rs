import { Reducer } from 'redux';
import { ModalState, ModalType } from './types';

const INITIAL_STATE: ModalState = {
    modalKey: false,
    id: '',
}

const reducer: Reducer<ModalState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case ModalType.TOGGLE:
        return {
            ...state,
            modalKey: action.payload.modalKey,
            id: action.payload.id,
        };
    default:
        return state;
    }
}

export default reducer;