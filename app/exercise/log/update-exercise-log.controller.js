import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

export const updateExerciseLogTime = expressAsyncHandler(async (req, res) => {
	const { weight, repeat, isCompleted } = req.body

	try {
		const exerciseLogTime = await prisma.exerciseTime.update({
			where: {
				id: +req.params.id
			},
			data: {
				weight,
				repeat,
				isCompleted
			}

		})

        res.json(exerciseLogTime)
	} catch (error) {
		if (!exerciseLog) {
			res.status(404)
			throw new Error('Exercise log not found')
		}
	}

	const exerciseLog = await prisma.exerciseLog.findUnique({
		where: {
			id: +req.params.id
		}
	})
})

export const completedExerciseLog = expressAsyncHandler(async (req, res) => {

    const {isCompleted} = req.body
    
    try {
        const exerciseLog = await prisma.exerciseLog.update({
            where: {
                id: +req.params.id
            },
            data: {
                isCompleted
            },
            include: {
                exercise: true,
                WorkoutLog: true
            }
        })

        res.json(exerciseLog)
    } catch(error) {
        res.status(404)
        throw new Error('Exercise log not found!')
    }
})
