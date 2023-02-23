import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_STRING_URI } from '../environments';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_STRING_URI),
    UserModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
