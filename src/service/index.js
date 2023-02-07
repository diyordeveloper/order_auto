import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, ToastAndroid} from 'react-native';

export const MainApi = 'https://dev-rauto.uz';
// export const MainApi = "http://185.196.214.145:5000";
// export const MainApi = "http://192.168.42.57";

const instance = axios.create({
  baseURL: `${MainApi}`,
});

export const userLogouts = async () => {
  await AsyncStorage.clear();
};
export const setStoreToken = async value => {
  // console.log("token",value);
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    await AsyncStorage.setItem('token', null);
  }
};
export const setUser = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    // console.log(8989,jsonValue);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (e) {
    return null;
  }
};
export const getUser = async () => {
  const user = await AsyncStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return false;
};
export const setLanguage = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('lang', jsonValue);
  } catch (e) {
    await AsyncStorage.setItem('lang', 'ru');
  }
};
export const getLanguage = async () => {
  const lang = await AsyncStorage.getItem('lang');
  if (lang) {
    return JSON.parse(lang);
  }
  return 'ru';
};
export const setSearch = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('search', jsonValue);
  } catch (e) {
    // await AsyncStorage.setItem('lang','ru')
  }
};
export const getSearch = async () => {
  const lang = await AsyncStorage.getItem('search');
  if (lang) {
    return JSON.parse(lang);
  }
  return null;
};
export const removeToken = async value => {
  // console.log("token",value);
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    await AsyncStorage.removeItem('token');
  }
};
export const getStoreToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    return token;
  }
  return '';
};

instance.interceptors.request.use(
  async config => {
    config.headers.Authorization = `${await getStoreToken()}`;
    config.headers = {
      ...config.headers,
      Accept: 'application/json',
      'User-Agent-OS': Platform.OS,
      'Content-Type': 'application/json',
      // "timeout": 5000,
    };
    // console.log("config111111111111111111",config);

    return config;
  },
  error => Promise.reject(error.response),
);

instance.interceptors.response.use(
  response => {
    // console.log("config  response", response);
    return response;
  },
  error => {
    // console.log("confid Error",error);
    return Promise.reject(error.response);
  },
);

export default instance;
