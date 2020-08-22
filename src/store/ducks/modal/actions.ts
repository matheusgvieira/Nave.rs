import { action } from 'typesafe-actions';
import { ModalType } from './types';

export const toggle = (modalKey: boolean) => action(ModalType.TOGGLE, { modalKey });

// export interface ModalAction {
//     type: ModalType;
//     payload: {
//       key: boolean; 
//     };
// }