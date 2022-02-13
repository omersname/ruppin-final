import {store} from '../store';
import {SYSTEM_ACTION} from '../reducers/system';

const setTopNotification = (message: string) => {
  if (message) {
    store.dispatch({type: SYSTEM_ACTION.TOP_NOTIFICATION, payload: message});
  }
};

export const systemActions = {
  setTopNotification,
};
