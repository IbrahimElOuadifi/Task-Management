import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { config } from 'dotenv'

import { authRouter } from './routes/index.js'

config()

const app = express()
const db_url = process.env.DB_URL || 'mongodb://localhost:27017'
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', authRouter)

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