-- CreateTable
CREATE TABLE "alzheimerReporting" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "classification" VARCHAR(255) NOT NULL,
    "deskription" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "alzheimerReporting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "alzheimerReporting" ADD CONSTRAINT "alzheimerReporting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
