import { Module } from '@nestjs/common';
import { PrismaService } from '@/client/prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
