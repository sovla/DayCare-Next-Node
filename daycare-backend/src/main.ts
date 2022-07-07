import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('server.port');
  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });

  await app.listen(port);
}
bootstrap();
