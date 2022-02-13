import {UserProps} from '../types/users';
import {database} from '../services/database';

const COLLECTION = 'users';

const getAll = async () => {
  try {
    return await database.all(COLLECTION);
  } catch (err) {
    throw err;
  }
};

const getById = async (id: UserProps['id']) => {
  try {
    return await database.get(COLLECTION, id) as UserProps;
  } catch (err) {
    throw err;
  }
};

const addNew = async (user: UserProps) => {
  try {
    await database.set(COLLECTION, user.id, user);
  } catch (err) {
    throw err;
  }
};

const update = async (user: UserProps) => {
  try {
    await database.put(COLLECTION, user.id, user);
  } catch (err) {
    throw err;
  }
};

export const userDatabase = {
  getAll,
  getById,
  addNew,
  update,
};
