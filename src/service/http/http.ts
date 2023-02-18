import axios from 'axios';
import Config from 'react-native-config';
import {ErrorLogger} from './loggers/error-logger';
import {RequestLogger} from './loggers/request-logger';
import {ResponseLogger} from './loggers/response-logger';

const axiosInstance = axios.create({
  baseURL: Config.BASE_URL,
});
axiosInstance.interceptors.request.use(RequestLogger, ErrorLogger);
axiosInstance.interceptors.response.use(ResponseLogger, ErrorLogger);
export const http = axiosInstance;
