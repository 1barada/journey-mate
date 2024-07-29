/*
  Warnings:

  - You are about to drop the column `chatId` on the `Journey` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[journeyId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `journeyId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JourneyStatus" AS ENUM ('mainJourneyMilestone', 'requestedToJoinMilestone', 'approvedJoinMilestone', 'declinedJoinMilestone');

-- DropForeignKey
ALTER TABLE "Journey" DROP CONSTRAINT "Journey_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropIndex
DROP INDEX "Journey_chatId_key";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "journeyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Journey" DROP COLUMN "chatId";

-- AlterTable
ALTER TABLE "JourneyUsersMilestone" ADD COLUMN     "status" "JourneyStatus" NOT NULL DEFAULT 'mainJourneyMilestone';

-- CreateIndex
CREATE UNIQUE INDEX "Chat_journeyId_key" ON "Chat"("journeyId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "Journey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
