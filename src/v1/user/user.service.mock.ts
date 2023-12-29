import { createMockService } from '@/libs/mock';
import { UserService } from '@/v1/user/user.service';

export const mockUserService = createMockService(UserService);
