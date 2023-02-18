export function getStatus(statusCode: number) {
  let result = '';
  if (statusCode >= 200 && statusCode < 300) {
    result = 'SUCCESS ';
  } else if (statusCode >= 100 && statusCode < 200) {
    result = 'INFO ';
  } else if (statusCode >= 300 && statusCode < 400) {
    result = 'REDIRECT ';
  } else if (statusCode >= 400 && statusCode < 500) {
    result = 'CLIENT ERROR ';
  } else {
    result = 'SERVER ERROR ';
  }

  return result;
}

//copied from
//https://github.com/axios/axios/blob/d99d5faac29899eba68ce671e6b3cbc9832e9ad8/lib/helpers/combineURLs.js
export function combineURLs(baseUrl: string, relativeURL?: string) {
  return relativeURL
    ? baseUrl.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseUrl;
}

export function controlDataLength<T>(inputData?: T[]) {
  const maxLength = 100;
  if (inputData) {
    const dataAsString = JSON.stringify(inputData, null, '\t');
    const dataStringTooLong = dataAsString.split('\n').length > maxLength;
    return dataStringTooLong
      ? dataAsString.split('\n').splice(0, maxLength).join('\n') + '\n\t...\n}'
      : dataAsString;
  } else {
    return 'No data';
  }
}
