import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'verbose', 'warn', 'error'],
  });
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const configService = app.get(ConfigService);
  const port = configService.get<string>('server.port');

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  const allowedOrigins = [
    'https://daycare-center.shop',
    'http://localhost:3001',
    'http://localhost:3000',
  ];
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
