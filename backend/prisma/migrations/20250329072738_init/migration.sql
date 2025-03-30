-- CreateTable
CREATE TABLE "role" (
    "id_pk" SERIAL NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id_pk" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "role_id_pk_key" ON "role"("id_pk");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_pk_key" ON "user"("id_pk");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
