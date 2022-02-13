import {db} from './firebase';

const all = async (collection: string) => {
  try {
    const ref = db.collection(collection);
    const res = await ref.get();
    return res.docs.map(doc => doc.data());
  } catch (err) {
    throw err;
  }
};

const get = async (collection: string, id: any) => {
  try {
    const ref = db.collection(collection);
    const doc = await ref.doc(id).get();
    return doc.data();
  } catch (err) {
    throw err;
  }
};

const set = async (collection: string, id: any, data: any) => {
  try {
    const ref = db.collection(collection);
    await ref.doc(id).set(data);
  } catch (err) {
    throw err;
  }
};

const put = async (collection: string, id: any, data: any) => {
  try {
    const ref = db.collection(collection);
    await ref.doc(id).update(data);
  } catch (err) {
    throw err;
  }
};

const cut = async (collection: string, id: any) => {
  try {
    const ref = db.collection(collection);
    await ref.doc(id).delete();
  } catch (err) {
    throw err;
  }
};

export const database = {
  all,
  get,
  set,
  put,
  cut,
};
