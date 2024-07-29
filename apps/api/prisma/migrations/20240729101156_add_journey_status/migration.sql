-- CreateEnum
CREATE TYPE "JourneyStatus" AS ENUM ('mainJourneyMilestone', 'requestedToJoinMilestone', 'approvedJoinMilestone', 'declinedJoinMilestone');

-- AlterTable
ALTER TABLE "JourneyUsersMilestone" ADD COLUMN     "status" "JourneyStatus" NOT NULL DEFAULT 'mainJourneyMilestone';
