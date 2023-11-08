/*
  Warnings:

  - The primary key for the `book` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "sentence" DROP CONSTRAINT "sentence_book_id_fkey";

-- AlterTable
ALTER TABLE "book" DROP CONSTRAINT "book_pk",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "contents" SET DATA TYPE VARCHAR(1000),
ADD CONSTRAINT "book_pk" PRIMARY KEY ("id");

-- AlterTable
CREATE SEQUENCE sentence_seq_seq;
ALTER TABLE "sentence" ALTER COLUMN "seq" SET DEFAULT nextval('sentence_seq_seq');
ALTER SEQUENCE sentence_seq_seq OWNED BY "sentence"."seq";

-- CreateIndex
CREATE INDEX "sentence_book_id_idx" ON "sentence"("book_id");

-- CreateIndex
CREATE INDEX "tag_sentence_seq_idx" ON "tag"("sentence_seq");
