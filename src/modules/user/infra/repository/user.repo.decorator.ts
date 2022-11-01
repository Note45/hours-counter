import { Inject } from '@nestjs/common';
import { userRepoProviderName } from './repo.module.config';

export const injectUserRepo = Inject(userRepoProviderName);
