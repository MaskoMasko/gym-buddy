import {createHttpAgent, createHttpsAgent} from './create-http-agents';
import {http} from './http';

export function configureHttp(): void {
  http.defaults.httpAgent = createHttpAgent();
  http.defaults.httpsAgent = createHttpsAgent();
}
