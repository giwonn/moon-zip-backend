import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  await createUser();
  await createBook();
  await createSentence();
  console.log(`Seeding finished.`);
}

async function createUser() {
  const users: Prisma.UserCreateInput[] = [
    {
      email: 'alice@prisma.io',
      macId: 'macId1',
      nickname: 'Alice',
      id: '85322046-2031-4fcf-843d-3d8cb1347ed9',
    },
  ];

  for (const user of users) {
    const isExist = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (isExist) continue;

    const createdUser = await prisma.user.create({
      data: user,
    });
    console.log(`Created user with id: ${createdUser.id}`);
  }
}

async function createBook() {
  const books: Prisma.BookCreateInput[] = [
    {
      id: '9788996991342',
      title: '미움받을 용기',
    },
  ];

  for (const book of books) {
    const isExist = await prisma.book.findUnique({
      where: { id: book.id },
    });

    if (isExist) continue;

    const createdBook = await prisma.book.create({
      data: book,
    });
    console.log(`Created book with id: ${createdBook.id}`);
  }
}

async function createSentence() {
  const sentences: Prisma.SentenceCreateInput[] = [
    {
      book: {
        connect: {
          id: '9788996991342',
        },
      },
      userId: '85322046-2031-4fcf-843d-3d8cb1347ed9',
      content:
        '자신이 생각하는 이상적인 삶을 살 수 있는 길은 가장 완벽한 하루를 상상해보는 것에서 시작한단다. 그리고 그 완벽한 하루와 닮은 습관들을 하나씩 만들어나가다 보면 결국엔 꿈꾸던 삶을 살게 된다는 것',
    },
  ];
  for (const sentence of sentences) {
    const isExist = await prisma.sentence.findUnique({
      where: { seq: 1 },
    });

    if (isExist) continue;

    const createdSentence = await prisma.sentence.create({
      data: sentence,
    });
    console.log(`Created sentence with id: ${createdSentence.seq}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
