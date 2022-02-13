const getEmailPrefix = (email?: string) => {
  return email?.split('@')[0];
};

const getNameInitials = (name?: string) => {
  return name?.split(' ').map(n => n[0]).join('');
};

export const mutate = {
  getEmailPrefix,
  getNameInitials,
};
