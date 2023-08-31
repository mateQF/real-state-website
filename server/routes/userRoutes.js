import express from 'express'
import { createUser, bookVisit, getAllBookings, getAllFavorites, cancelBooking, toFav } from '../controllers/userController.js'
import jwtCheck from '../config/auth0Config.js'

const router = express.Router()

router.post('/register', jwtCheck, createUser)

router.post('/allBookings', getAllBookings)
router.post('/bookVisit/:id', jwtCheck, bookVisit)
router.post('/removeBooking/:id', jwtCheck, cancelBooking)

router.post('/allFavorites', jwtCheck, getAllFavorites)
router.post('/toFav/:residencyId', jwtCheck, toFav)

export { router as authRoute }
