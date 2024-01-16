import type { Library as PrismaLibrary } from '@prisma/client';

export class Library implements PrismaLibrary {
  userId: string;
  bookId: string;
  createdAt: Date;
  deletedAt: Date | null;
}
