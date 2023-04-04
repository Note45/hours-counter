import { Inject } from '@nestjs/common';
import { categoryRepoProviderName } from './category.repo.config';

export const injectCategoryRepo = Inject(categoryRepoProviderName);
