-- AlterTable
ALTER TABLE "WaitlistEntry" ADD COLUMN     "destination" "Destination" NOT NULL DEFAULT 'JOB',
ADD COLUMN     "level" "SkillLevel" NOT NULL DEFAULT 'NONE';

