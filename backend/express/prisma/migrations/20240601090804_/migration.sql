/*
  Warnings:

  - You are about to drop the `AppointmentScheduling` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RetrievalAugmented` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AppointmentScheduling" DROP CONSTRAINT "AppointmentScheduling_userId_fkey";

-- DropTable
DROP TABLE "AppointmentScheduling";

-- DropTable
DROP TABLE "RetrievalAugmented";

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(255) NOT NULL DEFAULT 'scheduled',
    "location" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
