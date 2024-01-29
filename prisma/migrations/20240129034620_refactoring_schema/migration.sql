/*
  Warnings:

  - The primary key for the `libaray_book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `libaray_book` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `libaray_book` table. All the data in the column will be lost.
  - The primary key for the `sentence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `book_id` on the `sentence` table. All the data in the column will be lost.
  - You are about to drop the column `seq` on the `sentence` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `sentence` table. All the data in the column will be lost.
  - The primary key for the `tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `book_id` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the column `sentence_seq` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[library_id,book_id]` on the table `libaray_book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `libaray_book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `sentence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `library_book_id` to the `sentence` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sentence_book_id_idx";

-- DropIndex
DROP INDEX "tag_sentence_seq_idx";

-- AlterTable
ALTER TABLE "libaray_book" DROP CONSTRAINT "library_book_pk",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "library_book_pk" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sentence" DROP CONSTRAINT "sentence_pk",
DROP COLUMN "book_id",
DROP COLUMN "seq",
DROP COLUMN "user_id",
ADD COLUMN     "id" UUID NOT NULL,
ADD COLUMN     "library_book_id" UUID NOT NULL,
ADD CONSTRAINT "sentence_pk" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tag" DROP CONSTRAINT "tag_pk",
DROP COLUMN "book_id",
DROP COLUMN "sentence_seq",
DROP COLUMN "user_id",
ADD CONSTRAINT "tag_pk" PRIMARY KEY ("name");

-- CreateTable
CREATE TABLE "sentence_tag" (
    "sentence_id" UUID NOT NULL,
    "tag_name" TEXT NOT NULL,

    CONSTRAINT "sentence_tag_pkey" PRIMARY KEY ("sentence_id","tag_name")
);

-- CreateIndex
CREATE INDEX "sentence_tag_sentence_id_idx" ON "sentence_tag"("sentence_id");

-- CreateIndex
CREATE INDEX "sentence_tag_tag_name_idx" ON "sentence_tag"("tag_name");

-- CreateIndex
CREATE UNIQUE INDEX "libaray_book_library_id_book_id_key" ON "libaray_book"("library_id", "book_id");

-- CreateIndex
CREATE INDEX "sentence_library_book_id_idx" ON "sentence"("library_book_id");
