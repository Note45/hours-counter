import { getEnvs } from './cfgs/getEnvs';
import * as dotenv from 'dotenv';

dotenv.config();

const envs = process.env;

const ENVS = getEnvs(envs as any);

const MONGO_STRING_URI = `mongodb://${
  ENVS.DB_USER && ENVS.DB_PASS ? `${ENVS.DB_USER}:${ENVS.DB_PASS}@` : ''
}${ENVS.DB_HOST}:${ENVS.DB_PORT}/${ENVS.DB_NAME}`;

export { MONGO_STRING_URI, ENVS };
