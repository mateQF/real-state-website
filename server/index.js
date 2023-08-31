import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { authRoute } from './routes/userRoutes.js'
import { residencyRoute } from './routes/residencyRoute.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.listen(PORT, () => {
  console.log(`[SERVER] Listening on PORT: ${PORT}`)
})

app.use('/api/user', authRoute)
app.use('/api/residency', residencyRoute)
