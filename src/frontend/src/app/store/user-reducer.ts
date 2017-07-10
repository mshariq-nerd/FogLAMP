import { Action } from '@ngrx/store';

export const userReducer = (state: any = null, action: Action) => {
  switch (action.type) {
    case 'CURRENT_USER':
      console.log("Payload", action.payload);
      return  action.payload;
    default:
      return state;
  }
};