import {AnyAction} from 'redux';

export type SystemState = {
  topNotification: string;
}

const initState: SystemState = {
  topNotification: '',
};

export enum SYSTEM_ACTION {
  TOP_NOTIFICATION = 'TOP_NOTIFICATION',
}

export const systemReducer = (state: SystemState = initState, action: AnyAction) => {
  const {type, payload} = action;
  switch (type as SYSTEM_ACTION) {
    case SYSTEM_ACTION.TOP_NOTIFICATION:
      return {...state, topNotification: payload};
  }
  return state;
};
