/*
  Warnings:

  - The primary key for the `library` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `book_id` on the `library` table. All the data in the column will be lost.
  - The primary key for the `tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `library` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "library" DROP CONSTRAINT "library_pk",
DROP COLUMN "book_id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "library_pk" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sentence" ALTER COLUMN "book_id" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "tag" DROP CONSTRAINT "tag_pk",
ALTER COLUMN "book_id" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "tag_pk" PRIMARY KEY ("name", "user_id", "book_id", "sentence_seq");

-- CreateTable
CREATE TABLE "libaray_book" (
    "library_id" UUID NOT NULL,
    "book_id" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "library_book_pk" PRIMARY KEY ("library_id","book_id")
);

-- CreateIndex
CREATE INDEX "libaray_book_library_id_idx" ON "libaray_book"("library_id");

-- CreateIndex
CREATE INDEX "libaray_book_book_id_idx" ON "libaray_book"("book_id");
