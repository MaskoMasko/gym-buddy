import {AxiosResponse} from 'axios';
import {combineURLs, controlDataLength, getStatus} from '../common';

export const ResponseLogger = (response: AxiosResponse) => {
  const {
    config: {
      baseURL,
      method,
      // need to play around with params
      //  params,
      url,
    },
    data,
    // headers,
    status,
  } = response;

  // https://telepathy.freedesktop.org/doc/telepathy-glib/telepathy-glib-debug-ansi.html
  console.log(`
  ====================================================
  ${'\x1b[32m' + getStatus(status) + String(status).toUpperCase() + '\x1b[0m'}
  ${
    (method ? method.toUpperCase() : 'Unknown method') +
    ' ' +
    (baseURL ? combineURLs(baseURL, url) : url)
  }
  ====================================================
  data: ${controlDataLength(data)}`);

  return response;
};
