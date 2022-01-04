import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENVS } from '../environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(ENVS.PORT);
}

bootstrap();
