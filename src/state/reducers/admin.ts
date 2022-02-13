import {UserProps} from '../../types/users';
import {AnyAction} from 'redux';

export type AdminState = {
  userProps: UserProps;
  isLogged: boolean;
}

const initState: AdminState = {
  userProps: {},
  isLogged: false,
};

export enum ADMIN_ACTION {
  USER_PROPS = 'USER_PROPS',
  IS_LOGGED = 'IS_LOGGED',
}

export const adminReducer = (state: AdminState = initState, action: AnyAction) => {
  const {type, payload} = action;
  switch (type as ADMIN_ACTION) {
    case ADMIN_ACTION.USER_PROPS:
      return {...state, userProps: payload};
    case ADMIN_ACTION.IS_LOGGED:
      return {...state, isLogged: payload};
  }
  return state;
};
