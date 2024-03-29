import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'
import { calculateMinutes } from './calculate-minute.js'

export const CreateNewWorkout = expressAsyncHandler(async (req, res) => {
	const {name, exerciseIds} = req.body

	const workout = await prisma.workout.create({
		data: {
			name, 
			exercises: {
				connect: exerciseIds.map(id => ({ id: +id})),
			}
		}
	})

	res.json(workout)
}) 

export const getWorkouts = expressAsyncHandler(async (req, res, next) => {
	const workouts = await prisma.workout.findMany({
		orderBy: {
			createdAt: 'desc'
 		},
		include: {
			exercises: true
		}
	})
	res.json(workouts)
})

export const getWorkout = expressAsyncHandler(async (req, res, next) => {
	const workout = await prisma.workout.findUnique({
		where: { id: +req.params.id },
		include: {
			exercises: true
		}
	})

	if (!workout) {
		res.status(404)
		throw new Error('Workout not found')
	}

	const minutes = calculateMinutes(workout.exercises.length)

	res.json({ ...workout, minutes })
})

export const updateWorkout = expressAsyncHandler(async (req, res, next) => {
	const {name, exerciseIds} = req.body

	try {
		const workout = await prisma.workout.update({
			where: {
				id: +req.params.id
			},
			data: {
				name, 
				exercises: {
					set: exerciseIds.map(id => ({ id: +id})),
				}
			}
		})
		res.json(workout)
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}

}) 

export const deleteWorkout = expressAsyncHandler(async (req, res, next) => {
	try {
		await prisma.workout.delete({
			where: {
				id: +req.params.id
			},
		})
		res.json({message: 'Workout deleted successfully'})
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}

}) 

