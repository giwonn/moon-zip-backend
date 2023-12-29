/*
  Warnings:

  - The primary key for the `social_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[user_id,type]` on the table `social_user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "social_user" DROP CONSTRAINT "social_user_pk",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "social_user_pk" PRIMARY KEY ("user_id", "type", "id");

-- CreateIndex
CREATE UNIQUE INDEX "social_user_user_id_type_key" ON "social_user"("user_id", "type");
