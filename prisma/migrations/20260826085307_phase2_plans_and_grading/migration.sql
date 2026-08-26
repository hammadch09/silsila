-- CreateEnum
CREATE TYPE "Destination" AS ENUM ('JOB', 'FOUNDER');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('NONE', 'SOME', 'COMFORTABLE');

-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'PAUSED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "DayStatus" AS ENUM ('PENDING', 'SUBMITTED', 'GRADED', 'SKIPPED');

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_taskId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_trackId_fkey";

-- DropIndex
DROP INDEX "Submission_taskId_idx";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "review",
DROP COLUMN "status",
DROP COLUMN "taskId",
ADD COLUMN     "didWell" TEXT,
ADD COLUMN     "grade" INTEGER,
ADD COLUMN     "gradedAt" TIMESTAMP(3),
ADD COLUMN     "planDayId" TEXT NOT NULL,
ADD COLUMN     "toFix" TEXT;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "destination" "Destination" NOT NULL DEFAULT 'JOB';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "trackId",
ADD COLUMN     "daysPerWeek" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "destination" "Destination" NOT NULL DEFAULT 'JOB',
ADD COLUMN     "level" "SkillLevel" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "semester" INTEGER;

-- DropEnum
DROP TYPE "SubmissionStatus";

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "status" "PlanStatus" NOT NULL DEFAULT 'ACTIVE',
    "sequence" INTEGER NOT NULL DEFAULT 1,
    "weeks" INTEGER NOT NULL DEFAULT 12,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanDay" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "dayIndex" INTEGER NOT NULL,
    "scheduledFor" DATE NOT NULL,
    "status" "DayStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planDayId" TEXT,
    "body" TEXT NOT NULL,
    "answer" TEXT,
    "answeredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginCode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Plan_status_idx" ON "Plan"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_userId_sequence_key" ON "Plan"("userId", "sequence");

-- CreateIndex
CREATE INDEX "PlanDay_planId_scheduledFor_idx" ON "PlanDay"("planId", "scheduledFor");

-- CreateIndex
CREATE INDEX "PlanDay_status_idx" ON "PlanDay"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PlanDay_planId_dayIndex_key" ON "PlanDay"("planId", "dayIndex");

-- CreateIndex
CREATE INDEX "Question_userId_createdAt_idx" ON "Question"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "LoginCode_userId_createdAt_idx" ON "LoginCode"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_planDayId_key" ON "Submission"("planDayId");

-- CreateIndex
CREATE INDEX "Submission_grade_idx" ON "Submission"("grade");

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanDay" ADD CONSTRAINT "PlanDay_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanDay" ADD CONSTRAINT "PlanDay_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_planDayId_fkey" FOREIGN KEY ("planDayId") REFERENCES "PlanDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginCode" ADD CONSTRAINT "LoginCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

