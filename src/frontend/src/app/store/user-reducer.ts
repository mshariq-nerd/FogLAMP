import { Action } from '@ngrx/store';
import {User} from '../models/user';

export const userReducer = (state: any = null, action: Action) => {
  switch (action.type) {
    case 'CURRENT_USER':
      console.log("Payload", action.payload);
      return  action.payload;
    default:
      return state;
  }
};