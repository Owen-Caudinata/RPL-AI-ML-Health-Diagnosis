/*
  Warnings:

  - You are about to drop the column `classification` on the `PneumoniaReport` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `PneumoniaReport` table. All the data in the column will be lost.
  - Added the required column `predictionId` to the `PneumoniaReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PneumoniaReport" DROP COLUMN "classification",
DROP COLUMN "status",
ADD COLUMN     "predictionId" VARCHAR(255) NOT NULL;
