import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

export const CreateNewExercise = expressAsyncHandler(async (req, res, next) => {
	const {name, times, iconPath} = req.body

	const exercise = await prisma.exercise.create({
		data: {
			name, 
			times,
			iconPath
		}
	})

	res.json(exercise)
}) 

export const getExercises = expressAsyncHandler(async (req, res, next) => {
	const exercises = await prisma.exercise.findMany({
		orderBy: {
			createdAt: 'desc'
 		}
	})
	res.json(exercises)
})

export const updateExercise = expressAsyncHandler(async (req, res, next) => {
	const {name, times, iconPath} = req.body

	try {
		const exercise = await prisma.exercise.update({
			where: {
				id: +req.params.id
			},
			data: {
				name, 
				times,
				iconPath
			}
		})
		res.json(exercise)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}

}) 

export const deleteExercise = expressAsyncHandler(async (req, res, next) => {
	try {
		const exercise = await prisma.exercise.delete({
			where: {
				id: +req.params.id
			},
		})
		res.json({message: 'exercise deleted successfully'})
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}

}) 

