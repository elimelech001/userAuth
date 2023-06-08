// import { ConfigModule, ConfigService } from '@nestjs/config';
require('dotenv').config();

import {
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Address } from 'src/users/entitys/address.entity';
import { User } from 'src/users/entitys/users.entity';


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: process.env.DB_TYPE as any, 
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT, 
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    entities: [User, Address],
    synchronize: true,
    logging: true,
};