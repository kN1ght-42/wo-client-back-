/*
  Warnings:

  - You are about to drop the column `workoutLogId` on the `Exercise_log` table. All the data in the column will be lost.
  - You are about to drop the column `exercise_id` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise_log" DROP CONSTRAINT "Exercise_log_workoutLogId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_exercise_id_fkey";

-- AlterTable
ALTER TABLE "Exercise_log" DROP COLUMN "workoutLogId",
ADD COLUMN     "workout_log_id" INTEGER;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "exercise_id";

-- CreateTable
CREATE TABLE "_ExerciseToWorkout" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToWorkout_AB_unique" ON "_ExerciseToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToWorkout_B_index" ON "_ExerciseToWorkout"("B");

-- AddForeignKey
ALTER TABLE "Exercise_log" ADD CONSTRAINT "Exercise_log_workout_log_id_fkey" FOREIGN KEY ("workout_log_id") REFERENCES "Workout_log"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkout" ADD CONSTRAINT "_ExerciseToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkout" ADD CONSTRAINT "_ExerciseToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
