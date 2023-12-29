import type { SocialUser as ISocialUser } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class SocialUser implements ISocialUser {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  id: string;
}
