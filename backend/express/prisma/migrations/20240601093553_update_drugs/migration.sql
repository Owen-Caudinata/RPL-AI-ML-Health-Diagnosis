/*
  Warnings:

  - You are about to drop the `FetalHealth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FetalHealth" DROP CONSTRAINT "FetalHealth_userId_fkey";

-- AlterTable
ALTER TABLE "Drug" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "FetalHealth";

-- CreateTable
CREATE TABLE "FetalHealthReport" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fetalId" VARCHAR(255) NOT NULL,
    "age" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FetalHealthReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FetalHealthReport" ADD CONSTRAINT "FetalHealthReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
