import { Module } from '@nestjs/common';
// import { SentenceService } from './sentence.service';
import { TagController } from './tag.controller';
// import { SentenceRepository } from './sentence.repository';
import { toProvider } from '../../libs/util';

@Module({
  controllers: [TagController],
  // providers: toProvider(SentenceService, SentenceRepository),
})
export class TagModule {}
