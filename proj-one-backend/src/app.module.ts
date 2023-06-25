import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from 'dotenv';
import { MODELS } from './models';
import { AppRoutingModule } from './app.routing.module';
import { Sequelize } from 'sequelize-typescript';

let _ENV = config().parsed;

let CONNECTION: any = {
  username: _ENV['DB_USERNAME'],
  password: _ENV['DB_PASSWORD'],
  database: _ENV['DB_NAME'],
  host: _ENV['DB_HOST'],
  port: _ENV['DB_PORT'],
  dialect: _ENV['DB_DIALECT'],
  models: MODELS,
  logging: false,
  dialectOptions: {
    useUTC: false,
    dateStrings: true,
    typeCast: function (field: any, next: any) {
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    },
  },
  pool: {
    handleDisconnects: true,
    max: 10000,
    min: 1,
    acquire: 1200000,
    idle: 1000000,
  },
  timezone: '+05:30',
};

let MODULES = [SequelizeModule.forRoot(CONNECTION), AppRoutingModule];

MODULES = [...MODULES];

@Module({
  imports: MODULES,
  controllers: [AppController],
  providers: [AppService, { provide: 'SEQUELIZE', useExisting: Sequelize }],
})
export class AppModule {}
