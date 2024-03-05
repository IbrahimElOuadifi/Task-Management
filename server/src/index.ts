import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'

import { authRouter, projectRouter, listRouter, taskRouter, labelRouter, memberRouter } from './routes/index.js'

config()

const app = express()
const db_url = process.env.DB_URL || 'mongodb://localhost:27017'
const port = process.env.PORT || 3000
const dev_mode = process.env.NODE_ENV !== 'production'
const origin = process.env.ALLOWED_ORIGINS?.split(',') || '*'
// `http://localhost:${dev_mode ? '5173' : '4173'}`

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*', // or your client-side application's origin
  credentials: true, // to allow credentials
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
// app.use(expressForm.parse())

console.log(origin)

app.use("/uploads", express.static("uploads"))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/projects', projectRouter)
app.use('/api/v1/lists', listRouter)
app.use('/api/v1/tasks', taskRouter)
app.use('/api/v1/labels', labelRouter)
app.use('/api/v1/members', memberRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use((req: Request, res: Response, next) => {
  res.status(404).json({ message: 'Not Found' })
})

const main = async () => {
  try {
    await mongoose.connect(db_url, { authMechanism: 'DEFAULT', dbName: 'task_manager_db' })
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()