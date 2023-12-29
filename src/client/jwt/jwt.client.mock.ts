import { createMockService } from '@/libs/mock';
import { JwtClient } from '@/client/jwt/jwt.client';

export const mockJwtClient = createMockService(JwtClient);
