/*
  Warnings:

  - A unique constraint covering the columns `[channelId]` on the table `Liver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Liver` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Liver_channelId_key" ON "Liver"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "Liver_slug_key" ON "Liver"("slug");
