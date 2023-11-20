export interface IAuthService {
  extractTokenFromHeader(rawToken: string): string;
  verifyToken(token: string): string;
  rotateAccessToken(token: string): Promise<{ accessToken: string }>;
  rotateRefreshToken(
    token: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  decodeToken(base64String: string): string;
  signAccessToken(payload: any): string;
  signRefreshToken(): string;
}
