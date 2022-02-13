import {storage} from '../services/storage';
import {uniqueUtils} from '../dev/unique';

const PATH = 'properties';

const uploadImg = async (imgFile: File) => {
  try {
    const {name} = imgFile;
    const fileType = name.split('.')[1];
    const fileId = uniqueUtils.generateId();
    const fileName = `${fileId}.${fileType}`;
    const filePath = `${PATH}/${fileName}`;
    const fileUrl = await storage.upload(filePath, imgFile);
    return {imgUrl: fileUrl, imgName: fileName};
  } catch (err) {
    throw err;
  }
};

const removeImg = async (imgName: string) => {
  try {
    const path = `${PATH}/${imgName}`;
    await storage.remove(path);
  } catch (err) {
    throw err;
  }
};

export const propertyStorage = {
  uploadImg,
  removeImg,
};
