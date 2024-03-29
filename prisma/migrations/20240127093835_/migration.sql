/*
  Warnings:

  - You are about to drop the column `exerciseLogId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_exerciseLogId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "exerciseLogId",
DROP COLUMN "workoutId";

-- AlterTable
ALTER TABLE "Exercise_log" ADD COLUMN     "exercise_id" INTEGER;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "exercise_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise_log" ADD CONSTRAINT "Exercise_log_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
