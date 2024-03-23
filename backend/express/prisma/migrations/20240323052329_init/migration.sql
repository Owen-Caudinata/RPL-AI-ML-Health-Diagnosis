/*
  Warnings:

  - You are about to drop the `EHR` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EHR" DROP CONSTRAINT "EHR_userId_fkey";

-- DropTable
DROP TABLE "EHR";

-- CreateTable
CREATE TABLE "ElectronicHealthRecord" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ElectronicHealthRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ElectronicHealthRecord" ADD CONSTRAINT "ElectronicHealthRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
