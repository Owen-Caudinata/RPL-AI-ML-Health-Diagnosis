-- CreateTable
CREATE TABLE "DailyNewsLetter" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "content" TEXT,

    CONSTRAINT "DailyNewsLetter_pkey" PRIMARY KEY ("id")
);
