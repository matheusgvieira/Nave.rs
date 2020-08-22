import { createStore, Store } from 'redux';
import { ModalState } from './ducks/modal/types';

import rootReducer from './ducks/rootReducer';

export interface ApplicationState {
    modal: ModalState
}

const store: Store<ApplicationState> = createStore(rootReducer);

export default store;

// import { Reducer } from 'react';
// import { ModalState, ModalType } from './ducks/types';
// import { ModalAction } from './ducks/actions';

// export const initialState: ModalState = {
//     key: true,
// };

// export const reducer: Reducer<ModalState, ModalAction> = (state, action) => {
//     switch (action.type) {
//     case ModalType.Open:
//         return {
//             key: action.payload.key,
//         };
//     case ModalType.Close:
//         return {
//             key: action.payload.key,
//         };
//     default:
//         throw new Error();
//     }
// }