const checkEmail = (value: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !!value.toLowerCase().match(re);
};

const checkPassword = (value: string) => {
  const re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
  return !!value.match(re);
};

const checkPhoneNumber = (value: string) => {
  const re = /^\d+$/;
  return !!value.match(re);
};

export const validation = {
  checkEmail,
  checkPassword,
  checkPhoneNumber,
};
