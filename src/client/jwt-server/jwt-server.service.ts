import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class JwtServerService {
  abstract getRefreshToken(userId: string): Promise<string | null>;
  abstract addToken(userId: string, refreshToken: string): Promise<void>;
  abstract delete(userId: string): Promise<void>;
}
