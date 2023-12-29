-- CreateTable
CREATE TABLE "social_user" (
    "user_id" UUID NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "id" VARCHAR(100) NOT NULL,

    CONSTRAINT "social_user_pk" PRIMARY KEY ("user_id","type","id")
);

-- CreateIndex
CREATE INDEX "social_user_user_id_idx" ON "social_user"("user_id");
