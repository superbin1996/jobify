import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'

// db and authenticateUser
import connectDB from './db/connect.js'

// router
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import 'express'
import morgan from 'morgan'

app.use(express.json())

app.get('/', (request, response) => {
  response.send(`Welcome!`)
})

app.use(`/api/v1/auth`, authRouter)
app.use(`/api/v1/jobs`, jobsRouter)

app.use(notFoundMiddleware)
// Locate errorHandler at the end to catch error
app.use(errorHandlerMiddleware)


if (process.env.NODE_ENV !== `production`) {
  app.use(morgan('dev'))
}

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    })
  } catch (error) {
    console.log(error);
  }
}

start()