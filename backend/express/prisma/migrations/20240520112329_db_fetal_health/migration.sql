/*
  Warnings:

  - You are about to drop the column `Age` on the `FetalHealth` table. All the data in the column will be lost.
  - Added the required column `age` to the `FetalHealth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FetalHealth" DROP COLUMN "Age",
ADD COLUMN     "age" VARCHAR(255) NOT NULL;
