import type { User as PrismaUser } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class User implements PrismaUser {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  macId: string;
  @ApiProperty({ type: 'string', nullable: true })
  nickName: string | null;
  @ApiProperty({ type: 'string', nullable: true })
  imageUrl: string | null;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty({ example: null })
  deletedAt: Date | null;
}
