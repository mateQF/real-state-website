import asyncHandler from 'express-async-handler'

import { prisma } from '../config/prismaConfig.js'

export const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!userExists) {
      const user = await prisma.user.create({
        data: req.body
      })
      res.send({
        message: 'User registered successfully',
        user
      })
    } else {
      res.status(201).send({ message: 'User already registered' })
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while creating a user.' })
    throw new Error(error.message)
  }
})

export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body
  const { id } = req.params

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true }
    })

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .send({ message: 'This residency is already booked by you' })
    } else {
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: { push: { id, date } }
        }
      })
      res
        .status(200)
        .send({ message: 'Your visit has been booked successfully' })
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while booking a visit.' })
    throw new Error(error.message)
  }
})

export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body

  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true }
    })

    res.status(200).send(bookings)
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while getting all bookings.' })
    throw new Error(error.message)
  }
})

export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body
  const { id } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true }
    })

    const index = user.bookedVisits.findIndex((visit) => visit.id === id)

    if (index === -1) {
      res
        .status(404)
        .send({ message: 'This residency is not booked [BOOKING NOT FOUND]' })
    } else {
      const bookedVisits = user.bookedVisits.filter((visit) => visit.id !== id)
      await prisma.user.update({
        where: { email },
        data: { bookedVisits }
      })
      res.status(200).send({ message: 'Book cancelled successfully' })
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while canceling the booking.' })
    throw new Error(error.message)
  }
})

export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body
  const { residencyId } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (user.favResidenciesId.includes(residencyId)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesId: {
            set: user.favResidenciesId.filter((id) => id !== residencyId)
          }
        }
      })
      res.status(200).send({ message: 'Removed from favorites', user: updateUser })
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesId: {
            push: residencyId
          }
        }
      })
      res.status(200).send({ message: 'Updated favorites', user: updateUser })
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while adding residency to favs.' })
    throw new Error(error.message)
  }
})

export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body

  try {
    const favorites = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesId: true }
    })

    res.status(200).send(favorites)
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while getting favorites.' })
    throw new Error(error.message)
  }
})
