/*
  Warnings:

  - The primary key for the `social_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `user_id` on the `social_user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "social_user" DROP CONSTRAINT "social_user_pk",
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "social_user_pk" PRIMARY KEY ("user_id", "type", "id");

-- CreateIndex
CREATE INDEX "social_user_user_id_idx" ON "social_user"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "social_user_user_id_type_key" ON "social_user"("user_id", "type");
