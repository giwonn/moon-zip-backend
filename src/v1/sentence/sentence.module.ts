import { Module } from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { SentenceController } from './sentence.controller';
import { SentenceRepository } from './sentence.repository';
import { toProvider } from '../../libs/util';

@Module({
  controllers: [SentenceController],
  providers: toProvider(SentenceService, SentenceRepository),
})
export class SentenceModule {}
