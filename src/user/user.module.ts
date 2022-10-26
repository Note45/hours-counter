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
import { AuthUseCase } from './useCases/auth/auth.usecase';
import { AuthController } from './useCases/auth';
import { UserService } from './services/user.service';
import {
  GetUserInfosController,
  GetUserInfosUseCase,
} from './useCases/getUserInfos';
import { JwtStrategy } from '../shared/core/infra/auth/jwt.strategy';

@Module({
  imports: [UserRepoModuleConfig.toImport.Entity(), HttpModule, JwtStrategy],

  controllers: [
    CreateNewUserController,
    AuthController,
    GetUserInfosController,
  ],

  providers: [
    UserMapper,
    UserService,
    UserRepoMongoose,
    CreateNewUserUseCase,
    AuthUseCase,
    GetUserInfosUseCase,
    JwtStrategy,
    { provide: userRepoProviderName, useClass: UserRepoMongoose },
  ],

  exports: [{ provide: userRepoProviderName, useClass: UserRepoMongoose }],
})
export class UserModule {}
