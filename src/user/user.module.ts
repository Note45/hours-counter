import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserMapper } from './domain/mapper/user.mapper';
import { UserRepoMongoose } from './infra/repository/implementation/user.repository.mongoose';
import {
  UserRepoModuleConfig,
  userRepoProviderName,
} from './infra/repository/repo.module.config';
import {
  CreateNewUserController,
  CreateNewUserUseCase,
} from './useCases/createNewUser';

@Module({
  controllers: [CreateNewUserController],

  imports: [UserRepoModuleConfig.toImport.Entity(), HttpModule],

  providers: [
    UserMapper,
    UserRepoMongoose,
    CreateNewUserUseCase,
    { provide: userRepoProviderName, useClass: UserRepoMongoose },
  ],

  exports: [{ provide: userRepoProviderName, useClass: UserRepoMongoose }],
})
export class UserModule {}
