-- CreateTable
CREATE TABLE "FetalHealth" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fetalID" VARCHAR(255) NOT NULL,
    "Age" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FetalHealth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drugs" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nameDrugs" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,

    CONSTRAINT "Drugs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetrievalAugmented" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "RetrievalID" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "RetrievalAugmented_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentScheduling" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "description" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AppointmentScheduling_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FetalHealth" ADD CONSTRAINT "FetalHealth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentScheduling" ADD CONSTRAINT "AppointmentScheduling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
