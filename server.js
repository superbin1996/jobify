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
import authenticatedUser from './middleware/auth.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// security
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

if (process.env.NODE_ENV !== `production`) {
  app.use(morgan('dev'))
}

// Only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.use(express.json())
app.use(`/api/v1/auth`, authRouter)
app.use(`/api/v1/jobs`, authenticatedUser, jobsRouter)

app.get('*', (request, response)=>{
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
// Locate errorHandler at the end to catch error
app.use(errorHandlerMiddleware)


// app.get('/', (request, response) => {
//   response.send(`Welcome!`)
// })

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