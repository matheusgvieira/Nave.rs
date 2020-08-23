import { action } from 'typesafe-actions';
import { ModalType } from './types';

export const toggle = (modalKey: boolean, id: string) => action(ModalType.TOGGLE, { modalKey, id });

// export interface ModalAction {
//     type: ModalType;
//     payload: {
//       key: boolean; 
//     };
// }