import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {PostService} from './post.service';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postService.create(createPostDto, req.user.id);
  }

  @Get()
  findAll(@Request() req) {
    return this.postService.findAllPostedTo(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.postService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto,@Request() req) {
    return this.postService.update(+id, updatePostDto,+req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Request() req) {
    return this.postService.remove(+id,req.user.id);
  }
}
