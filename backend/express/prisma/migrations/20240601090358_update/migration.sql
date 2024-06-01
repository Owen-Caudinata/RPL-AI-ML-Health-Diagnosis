/*
  Warnings:

  - You are about to drop the `Drugs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Drugs";

-- CreateTable
CREATE TABLE "Drug" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "manufacturer" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "Drug_pkey" PRIMARY KEY ("id")
);
