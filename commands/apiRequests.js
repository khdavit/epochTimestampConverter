import axios from 'axios';

let instance = null;

export const constructor = async () => {
  const config = {
    baseURL: 'https://helloacm.com/api',
    headers: {
      'Accept': '/',
    }
  };
  instance = axios.create(config);
};

export const apiError = async (err, request) => {
  const output = {
    method: err?.response?.request?.method,
    path: err?.response?.request?.path,
    status: err?.response?.status,
    response: err?.response?.data?.error || err?.response?.data?.errors,
  };
  const error = JSON.stringify(output, null, 2);
  const errorFinal = error === '{}' ? err : error;
  console.error(errorFinal);
  throw new Error(err);
};

/**
 * To Convert From Unix TimeStamp to Date String
 */
export const convertTimestamp = async time => {
  try {
    const res = await instance.get(`/unix-timestamp-converter/?cached&s=${time}`);
    return res.data;
  }
  catch (err) {
    return apiError(err);
  }
};
