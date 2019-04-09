import { config } from 'config';

export const environment = {
  production: config.production,
  AUTH_URL: config.AUTH_URL,
  GRANT_TYPE: config.GRANT_TYPE,
  CLIENT_SECRET: config.CLIENT_SECRET,
  CLIENT_ID: config.CLIENT_ID,
  API_CEP: config.API_CEP
};
