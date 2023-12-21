import type { User as PrismaUser } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class User implements PrismaUser {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  macId: string;
  @ApiProperty({ required: false })
  nickname: string | null;
  @ApiProperty({ required: false })
  imageUrl: string | null;
  @ApiProperty({ required: false })
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
