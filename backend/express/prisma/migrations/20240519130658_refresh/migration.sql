/*
  Warnings:

  - You are about to drop the column `fetalID` on the `FetalHealth` table. All the data in the column will be lost.
  - Added the required column `type` to the `AppointmentScheduling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Drugs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drugsID` to the `Drugs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fetalId` to the `FetalHealth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentScheduling" ADD COLUMN     "type" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Drugs" ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ADD COLUMN     "drugsID" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "FetalHealth" DROP COLUMN "fetalID",
ADD COLUMN     "fetalId" VARCHAR(255) NOT NULL;
