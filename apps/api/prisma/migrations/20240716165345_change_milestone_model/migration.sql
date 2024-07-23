/*
  Warnings:

  - You are about to drop the column `endDate` on the `Journey` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Journey` table. All the data in the column will be lost.
  - You are about to drop the column `coords` on the `Milestone` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `lat` to the `Milestone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Milestone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Milestone` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Milestone_coords_key";

-- AlterTable
ALTER TABLE "Journey" DROP COLUMN "endDate",
DROP COLUMN "startDate";

-- AlterTable
ALTER TABLE "Milestone" DROP COLUMN "coords",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";

