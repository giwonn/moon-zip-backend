import { Module } from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { SentenceController } from './sentence.controller';
import { SentenceRepository } from './sentence.repository';

@Module({
  controllers: [SentenceController],
  providers: [SentenceService, SentenceRepository],
  exports: [SentenceService, SentenceRepository],
})
export class SentenceModule {}
