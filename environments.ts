import { getEnvs } from './cfgs/getEnvs';
import * as dotenv from 'dotenv';

dotenv.config();

const envs = process.env;

export const ENVS = getEnvs(envs as any);