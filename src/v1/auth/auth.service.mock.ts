import { createMockService } from '@/libs/mock';
import { AuthService } from '@/v1/auth/auth.service';

export const mockAuthService = createMockService(AuthService);
