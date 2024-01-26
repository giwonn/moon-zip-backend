import type { Library as PrismaLibrary } from '@prisma/client';

export class Library implements PrismaLibrary {
  id: string;
  userId: string;
  createdAt: Date;
  deletedAt: Date | null;
}
