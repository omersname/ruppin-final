import {navigation} from '../services/navigation';
import {API_ROUTE} from '../config/routes';

const ROOT = 'http://localhost:3000';

export const navigate = {
  home: () => navigation.goTo(ROOT),
  register: () => navigation.goTo(ROOT + API_ROUTE.REGISTER()),
  login: () => navigation.goTo(ROOT + API_ROUTE.LOGIN()),
  profile: (id: string) => navigation.goTo(ROOT + API_ROUTE.PROFILE(id)),
  property: (id: string) => navigation.goTo(ROOT + API_ROUTE.PROPERTY(id)),
  explore: () => navigation.goTo(ROOT + API_ROUTE.EXPLORE()),
};
