import {store} from '../store';
import {UserProps} from '../../types/users';
import {ADMIN_ACTION} from '../reducers/admin';

const setUserProps = (userProps: UserProps) => {
  if (userProps) {
    store.dispatch({type: ADMIN_ACTION.USER_PROPS, payload: userProps});
    setIsLogged(true);
  }
};

const setIsLogged = (isLogged: boolean) => {
  store.dispatch({type: ADMIN_ACTION.IS_LOGGED, payload: isLogged});
};

export const adminActions = {
  setUserProps,
  setIsLogged,
};
