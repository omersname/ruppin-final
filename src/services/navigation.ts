import Router from 'next/router';

const goTo = (path: string) => {
  return Router.push(path);
};

const refresh = () => {
  return Router.reload();
};

const goBack = () => {
  return Router.back();
};

export const navigation = {
  goTo,
  refresh,
  goBack,
};
