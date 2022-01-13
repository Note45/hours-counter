import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from '../entities/user.entity';
import { UserRepoMongoose } from './implementation/user.repository';

export const userRepoProviderName = 'UserRepoModel';

export const UserRepoModuleConfig = {
  toProvider: () => ({
    provide: userRepoProviderName,
    useClass: UserRepoMongoose,
  }),
  toImport: {
    Entity: () =>
      MongooseModule.forFeature([
        { name: UserEntity.name, schema: UserSchema },
      ]),
  },
};
