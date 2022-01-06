import { getEnvs } from './cfgs/getEnvs';
import * as dotenv from 'dotenv';

dotenv.config();

const envs = process.env;

export const ENVS = getEnvs(envs as any);

export const MONGO_STRING_URI = `mongodb://${
  ENVS.DB_USER && ENVS.DB_PASS ? `${ENVS.DB_USER}:${ENVS.DB_PASS}@` : ''
}${ENVS.DB_HOST}:${ENVS.DB_PORT}/${ENVS.DB_NAME}`;
