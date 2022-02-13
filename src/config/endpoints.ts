import {API_ROUTE} from './routes';

const ROOT = '/api';

export const API_ENDPOINT = {
  REGISTER: () => ROOT + API_ROUTE.REGISTER(),
  LOGIN: () => ROOT + API_ROUTE.LOGIN(),
  LOGOUT: () => ROOT + API_ROUTE.LOGOUT(),
};
