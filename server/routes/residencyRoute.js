import express from 'express'
import { createResidency, getAllResidencies, getResidency } from '../controllers/residencyController.js'
import jwtCheck from '../config/auth0Config.js'

const router = express.Router()

router.get('/allResidencies', getAllResidencies)
router.get('/:id', getResidency)

router.post('/create', jwtCheck, createResidency)

export { router as residencyRoute }
