/*
  Warnings:

  - You are about to drop the `libaray_book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "libaray_book";

-- CreateTable
CREATE TABLE "library_book" (
    "id" UUID NOT NULL,
    "library_id" UUID NOT NULL,
    "book_id" VARCHAR(100) NOT NULL,

    CONSTRAINT "library_book_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "library_book_library_id_idx" ON "library_book"("library_id");

-- CreateIndex
CREATE INDEX "library_book_book_id_idx" ON "library_book"("book_id");

-- CreateIndex
CREATE UNIQUE INDEX "library_book_library_id_book_id_key" ON "library_book"("library_id", "book_id");
