import { Reducer } from 'redux';
import { ModalState, ModalType } from './types';

const INITIAL_STATE: ModalState = {
    modalKey: false,
}

const reducer: Reducer<ModalState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case ModalType.TOGGLE:
        return {
            ...state,
            modalKey: action.payload.modalKey,
        };
    default:
        return state;
    }
}

export default reducer;