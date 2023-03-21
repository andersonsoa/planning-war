import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const cors = configService.get('CORS_URL');

  app.enableCors({ origin: cors });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
