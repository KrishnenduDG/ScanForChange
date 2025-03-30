-- CreateTable
CREATE TABLE "waste_reports" (
    "id_pk" SERIAL NOT NULL,
    "rid" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "location" INTEGER[],
    "reported_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "wastes_reported" TEXT[]
);

-- CreateTable
CREATE TABLE "waste_report_category_map" (
    "id_pk" SERIAL NOT NULL,
    "wasteReportId" INTEGER NOT NULL,
    "wasteCategoryId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "waste_reports_id_pk_key" ON "waste_reports"("id_pk");

-- CreateIndex
CREATE UNIQUE INDEX "waste_reports_rid_key" ON "waste_reports"("rid");

-- CreateIndex
CREATE UNIQUE INDEX "waste_reports_imgUrl_key" ON "waste_reports"("imgUrl");

-- CreateIndex
CREATE UNIQUE INDEX "waste_report_category_map_id_pk_key" ON "waste_report_category_map"("id_pk");

-- AddForeignKey
ALTER TABLE "waste_reports" ADD CONSTRAINT "waste_reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "waste_report_category_map" ADD CONSTRAINT "waste_report_category_map_wasteReportId_fkey" FOREIGN KEY ("wasteReportId") REFERENCES "waste_reports"("id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "waste_report_category_map" ADD CONSTRAINT "waste_report_category_map_wasteCategoryId_fkey" FOREIGN KEY ("wasteCategoryId") REFERENCES "waste_categories"("id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;
