import type { User as PrismaUser } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class User implements PrismaUser {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  macId: string;
  @ApiProperty()
  nickname: string;
  @ApiProperty({ required: false })
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
