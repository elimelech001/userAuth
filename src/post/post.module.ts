import {Module} from '@nestjs/common';
import {PostService} from './post.service';
import {PostController} from './post.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Post} from './entities/post.entity';
import {User} from 'src/users/entitys/users.entity';
import {UsersService} from 'src/users/services/users.service';
import {UsersModule} from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), UsersModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
