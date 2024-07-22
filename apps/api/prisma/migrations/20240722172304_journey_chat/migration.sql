/*
  Warnings:

  - A unique constraint covering the columns `[chatId]` on the table `Journey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chatId` to the `Journey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Journey" ADD COLUMN     "chatId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT;

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(400) NOT NULL,
    "senderId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Journey_chatId_key" ON "Journey"("chatId");

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
