import AsyncStorage from '@react-native-async-storage/async-storage';
import {InternalAxiosRequestConfig} from 'axios';
import {combineURLs} from '../common';

export const RequestLogger = (request: InternalAxiosRequestConfig<any>) => {
  const {
    method,
    url,
    baseURL,
    //  params
  } = request;
  // https://telepathy.freedesktop.org/doc/telepathy-glib/telepathy-glib-debug-ansi.html
  console.log(
    `\x1b[33m REQUEST | \x1b[0m ${
      (method ? method.toUpperCase() : 'Unknown method') +
      ' ' +
      (baseURL ? combineURLs(baseURL, url) : url)
    }`,
  );
  return (async function () {
    const token = await AsyncStorage.getItem('token');
    if (request.headers && token) {
      request.headers.Authorization = 'Bearer ' + token;
    }
    return request;
  })();
};
