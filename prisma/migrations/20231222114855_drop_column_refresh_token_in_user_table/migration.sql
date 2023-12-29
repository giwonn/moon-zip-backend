/*
  Warnings:

  - You are about to drop the column `refresh_token` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "refresh_token_uk";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "refresh_token";
