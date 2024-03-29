import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { addPrevValues } from './add-prev-values.util.js'

export const getExerciseLog = expressAsyncHandler(async (req, res) => {
	const exerciseLog = await prisma.exerciseLog.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			exercise: true,
			times: {
				orderBy: {
					id: 'asc'
				}
			}
		}
	})

	if (!exerciseLog) {
		res.status(404)
		throw new Error('Exercise Log not found')
	}

	const prevExerciseLog = await prisma.exerciseLog.findFirst({
		where: {
			exerciseId: exerciseLog.exerciseLogId,
			userId: req.user.id,
			isCompleted: true
		},
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			times: true
		}
	})

	const newTimes = addPrevValues(exerciseLog, prevExerciseLog)

	res.json({ ...exerciseLog, times: newTimes })
})
