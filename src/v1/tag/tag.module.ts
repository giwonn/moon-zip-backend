import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagRepository } from './tag.repository';
import { toProvider } from '../../libs/util';

@Module({
  controllers: [TagController],
  providers: toProvider(TagService, TagRepository),
})
export class TagModule {}
