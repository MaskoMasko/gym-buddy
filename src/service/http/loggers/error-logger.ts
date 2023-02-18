import {AxiosError, isAxiosError} from 'axios';
import {combineURLs, getStatus} from '../common';

export const ErrorLogger = (error: AxiosError) => {
  if (!isAxiosError(error)) {
    throw error;
  }
  const {message, config, response} = error;
  const method = config?.method ?? 'Unknown method';
  const url = config?.url ?? '';
  const baseURL = config?.baseURL ?? '';
  const status = response?.status ?? 400;

  // https://telepathy.freedesktop.org/doc/telepathy-glib/telepathy-glib-debug-ansi.html
  console.log(`
  ====================================================
  ${'\x1b[31m' + getStatus(status) + String(status).toUpperCase() + '\x1b[0m'}
  ${method.toUpperCase() + ' ' + (baseURL ? combineURLs(baseURL, url) : url)}
  ====================================================
  Message: ${message}`);

  throw error;
};
