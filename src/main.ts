import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  let httpsOptions = null;
  if (process.env.SSL === 'true') {
    httpsOptions = {
      key: fs.readFileSync(`${process.cwd()}/dist/privkey.pem`),
      cert: fs.readFileSync(`${process.cwd()}/dist/cert.pem`),
    };
  }

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
    httpsOptions,
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Moon-Zip API')
    .setDescription('The Moon-Zip API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
