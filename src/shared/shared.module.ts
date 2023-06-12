// shared/shared.module.ts
import { Module, Global } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Global() 
@Module({
  providers: [MessagesService],
  exports: [MessagesService],
})
export class SharedModule {
  static forRoot() { 
    return {
      module: SharedModule,
      exports: [MessagesService],
    };
  }
}
