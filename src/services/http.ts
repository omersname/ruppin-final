import axios from 'axios';

const get = async (endpoint: string) => {
  try {
    return await axios.get(endpoint);
  } catch (err) {
    throw err;
  }
};

const post = async (endpoint: string, data: any) => {
  try {
    return await axios.post(endpoint, data);
  } catch (err) {
    throw err;
  }
};

export const http = {
  get,
  post,
};
