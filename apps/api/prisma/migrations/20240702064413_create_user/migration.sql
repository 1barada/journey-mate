-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'viewer');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "role" "Role" NOT NULL DEFAULT 'viewer',
    "description" TEXT,
    "sex" "Sex",
    "dateOfBirth" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
