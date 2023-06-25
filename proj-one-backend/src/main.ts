import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { config } from 'dotenv';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

let _ENV = config().parsed;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  if (_ENV['NODE_ENV'] === 'development') {
    app.use(morgan('dev'));
  }
  app.use(cookieParser);
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        console.log(validationErrors);
        return new BadRequestException(validationErrors);
      },
      enableDebugMessages: true,
      disableErrorMessages: false,
    }),
  );

  await app.listen(_ENV['PORT'], () => {
    console.log(`Server running on port ${_ENV['PORT']}...`);
  });
}
bootstrap();
