/*
  Warnings:

  - Added the required column `authProvider` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('password', 'socials');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "authProvider" "AuthProvider" NOT NULL,
ADD COLUMN     "passwordHash" VARCHAR(72);
