/*
  Warnings:

  - A unique constraint covering the columns `[refresh_token]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refresh_token` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "refresh_token" VARCHAR(200) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_uk" ON "user"("refresh_token");
