-- CreateTable
CREATE TABLE "book" (
    "id" VARCHAR(50) NOT NULL,
    "title" VARCHAR(200),
    "contents" VARCHAR(200),
    "url" VARCHAR(200),
    "authors" VARCHAR[] DEFAULT ARRAY[]::VARCHAR[],
    "translators" VARCHAR[] DEFAULT ARRAY[]::VARCHAR[],
    "publisher" VARCHAR,
    "price" INTEGER,
    "sale_price" INTEGER,
    "thumbnail_url" VARCHAR(200),
    "status" VARCHAR(20),
    "publish_date" TIMESTAMP(6),

    CONSTRAINT "book_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sentence" (
    "seq" INTEGER NOT NULL,
    "book_id" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "content" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "sentence_pk" PRIMARY KEY ("seq")
);

-- CreateTable
CREATE TABLE "user" (
    "email" VARCHAR(50) NOT NULL,
    "mac_id" VARCHAR(100) NOT NULL,
    "nickname" VARCHAR(20) NOT NULL,
    "image_url" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "id" UUID NOT NULL,

    CONSTRAINT "user_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "name" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "book_id" VARCHAR(50) NOT NULL,
    "sentence_seq" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "tag_pk" PRIMARY KEY ("name","user_id","book_id","sentence_seq")
);

-- CreateTable
CREATE TABLE "library" (
    "user_id" UUID NOT NULL,
    "book_id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "library_pk" PRIMARY KEY ("user_id","book_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_uk" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "mac_id_uk" ON "user"("mac_id");

-- AddForeignKey
ALTER TABLE "sentence" ADD CONSTRAINT "sentence_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
