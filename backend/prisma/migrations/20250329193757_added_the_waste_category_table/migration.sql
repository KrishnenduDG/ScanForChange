-- CreateTable
CREATE TABLE "waste_categories" (
    "id_pk" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "waste_categories_id_pk_key" ON "waste_categories"("id_pk");
