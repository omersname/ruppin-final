const BASE = {
  AUTH: 'auth',
  USER: 'user',
  PROPERTY: 'property',
};

const buildRoute = (...params: string[]) => '/' + [...params].join('/');

export const API_ROUTE = {
  REGISTER: () => buildRoute(BASE.AUTH, 'register'),
  LOGIN: () => buildRoute(BASE.AUTH, 'login'),
  PROFILE: (id: string) => buildRoute(BASE.USER, id),
  LOGOUT: () => buildRoute(BASE.AUTH, 'logout'),
  PROPERTY: (id: string) => buildRoute(BASE.PROPERTY, id),
  EXPLORE: () => buildRoute('explore'),
};
