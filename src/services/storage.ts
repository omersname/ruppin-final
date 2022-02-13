import {sg} from './firebase';

const upload = async (path: string, file: File) => {
  try {
    const ref = sg.ref().child(path);
    await ref.put(file);
    return await ref.getDownloadURL();
  } catch (err) {
    throw err;
  }
};

const remove = async (path: string) => {
  try {
    const ref = sg.ref().child(path);
    await ref.delete();
  } catch (err) {
    throw err;
  }
};

export const storage = {
  upload,
  remove,
};
