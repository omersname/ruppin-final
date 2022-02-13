import {database} from '../services/database';
import {PropertyProps} from '../types/properties';

const COLLECTION = 'properties';

const getAll = async () => {
  try {
    return await database.all(COLLECTION);
  } catch (err) {
    throw err;
  }
};

const getById = async (id: PropertyProps['id']) => {
  try {
    return await database.get(COLLECTION, id) as PropertyProps;
  } catch (err) {
    throw err;
  }
};

const addNew = async (property: PropertyProps) => {
  try {
    await database.set(COLLECTION, property.id, property);
  } catch (err) {
    throw err;
  }
};

const update = async (property: PropertyProps) => {
  try {
    await database.put(COLLECTION, property.id, property);
  } catch (err) {
    throw err;
  }
};

const remove = async (propertyId: PropertyProps['id']) => {
  try {
    await database.cut(COLLECTION, propertyId);
  } catch (err) {
    throw err;
  }
};

export const propertyDatabase = {
  getAll,
  getById,
  addNew,
  update,
  remove,
};
