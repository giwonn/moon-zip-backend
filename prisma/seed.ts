import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// {
//   email: string;
//   macId: string;
//   nickname: string;
//   imageUrl?: string;
//   createdAt?: string | Date;
//   updatedAt?: string | Date;
//   deletedAt?: string | Date;
//   id: string;
// }
const userData: Prisma.UserCreateInput[] = [
  {
    email: 'alice@prisma.io',
    macId: 'macId1',
    nickname: 'Alice',
    id: '85322046-2031-4fcf-843d-3d8cb1347ed9',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
