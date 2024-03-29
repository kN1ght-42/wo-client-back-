import expressAsyncHandler from "express-async-handler";
import { prisma } from "../../prisma.js";

import { calculateMinutes } from "../calculate-minute.js";

export const getWorkoutLog = expressAsyncHandler(async (req, res) => {
    const workoutLog = await prisma.workoutLog.findUnique({
        where: {
            id: +req.params.id
        },
        include: {
            workout: {
                include: {
                    exercises: true
                }
            },
            exerciseLogs: {
                orderBy: {
                    id: 'asc'
                },
                include: {
                    exercise: true
                }
            }
        }
    })

    if(!workoutLog) {
        res.status(404)
        throw new Error('workout Log not found')
    }


    res.json({ ...workoutLog, minutes: calculateMinutes(workoutLog.workout.exercises.length) })
})

