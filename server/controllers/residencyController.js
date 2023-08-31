import asyncHandler from 'express-async-handler'

import { prisma } from '../config/prismaConfig.js'

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    city,
    country,
    image,
    facilities,
    userEmail
  } = req.body.data

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        owner: {
          connect: { email: userEmail }
        }
      }
    })

    res
      .status(201)
      .send({ message: 'Residency created successfully', residency })
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error(`A residency with address ${address} already exists`)
    }
    throw new Error(error.message)
  }
})

export const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.status(200).send(residencies)
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' })
    throw new Error(error.message)
  }
})

export const getResidency = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const residency = await prisma.residency.findUnique({
      where: {
        id
      }
    })

    res.status(200).send(residency)
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' })
    throw new Error(error.message)
  }
})
