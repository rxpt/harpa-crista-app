import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const getJSON = (key: string) => {
  try {
    return JSON.parse(storage.getString(key) || '');
  } catch (error) {
    return null;
  }
};

export const setJSON = (key: string, value: any) => {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};
