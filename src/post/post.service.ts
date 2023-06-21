import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entitys/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { PostCreationResult } from './interface/PostCreationResult .interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly usersService: UsersService,
  ) { }
  async create(createPostDto: CreatePostDto, fromUserId: number) {
    try {
      const { toUserId, ...rest } = createPostDto;
      const toUser = await this.usersService.getUserById(toUserId);
      const fromUser = await this.usersService.getUserById(fromUserId);

      const newPost = this.postRepository.create(rest);

      newPost.to = toUser;
      newPost.user = fromUser;
      await this.postRepository.save(newPost);

      return {
        postId: newPost.id,
        toUsername: toUser.username,
        fromUsername: fromUser.username,
        title: newPost.title,
        description: newPost.description
      };
    } catch (error) {
      console.error(error);
      throw new Error('Could not create post. Please try again.');
    }
  }

  async findAllPostedFrom(userId: number): Promise<PostCreationResult[]> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.to', 'toUser')
      .leftJoin('post.user', 'fromUser')
      .where('post.user.id = :userId', { userId })
      .select([
        'post.id as id',
        'post.title as title',
        'post.description as description',
        'toUser.username as postedTo',
        'fromUser.username as postedFrom'
      ]);

    const rawPosts = await queryBuilder.getRawMany();
    return rawPosts
  }
  async findAllPostedTo(userId: number): Promise<PostCreationResult[]> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.to', 'toUser')
      .leftJoin('post.user', 'fromUser')
      .where('post.to.id = :userId', { userId })
      .select([
        'post.id as id',
        'post.title as title',
        'post.description as description',
        'toUser.username as postedTo',
        'fromUser.username as postedFrom'
      ]);

    const rawPosts = await queryBuilder.getRawMany();
    return rawPosts
  }

  async findOne(id: number, userId: number) {

    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.to', 'toUser')
      .leftJoin('post.user', 'fromUser')
      .where('post.id = :id', { id })
      .andWhere('post.user.id = :userId', { userId })

      .select([
        'post.id as postId',
        'post.title as title',
        'post.description as description',
        'toUser.username as toUsername',
        'fromUser.username as fromUsername'
      ]);

    const post: PostCreationResult = await queryBuilder.getRawOne();

    if (!post) {
      throw new NotFoundException('no post availeble')
    }
    return post;
    // throw new BadRequestException('error');
  }


  async update(id: number, updatePostDto: UpdatePostDto, userId: number): Promise<any> {
    const post = await this.postRepository.findOne({ where: { id } ,relations:['user']});
    if (!post) {
      throw new NotFoundException(`Post with ID: ${id} not found.`);
    }

    if (post.user.id !== userId) {
      throw new UnauthorizedException(`You can only update your own posts.`);
    }

    const updatedPost = await this.postRepository.update(id, updatePostDto);

    return updatedPost
  }

  async remove(id: number, userId: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID: ${id} not found.`);
    }

    if (post.user.id !== userId) {
      throw new UnauthorizedException(`You can only delete your own posts.`);
    }

    const deletedPost = await this.postRepository.delete(id);
    return `Successfully removed post with ID: ${id}`;
  }
}