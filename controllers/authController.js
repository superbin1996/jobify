import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnauthenticatedError } from "../errors/index.js"

const register = async (request, response) => {
  const { name, email, password } = request.body
  if (!name || !email || !password) {
    throw new BadRequestError(`Please fill out all fields`)
  }
  const userAreadyExists = await User.findOne({ email })
  if (userAreadyExists) {
    throw new BadRequestError(`Email already in use`)
  }
  const user = await User.create(request.body)
  const token = user.createJWT()
  response.status(StatusCodes.CREATED).json({
    user: {
      firstName: user.firstName,
      name: user.name,
      email: user.email,
    },
    token,
    location: user.location,
  })
}

const login = async (request, response) => {
  const { email, password } = request.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ email }).select('+password')
  console.log(user);

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const token = user.createJWT()
  user.password = undefined
  response.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const updateUser = async (request, response) => {
  const { email, name, lastName, location } = request.body
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values')
  }

  // userId is defined in auth.js
  const user = await User.findOne({ _id: request.user.userId })

  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location

  await user.save()

  // various setups
  // in this case only id
  // if other properties included, must re-generate

  const token = user.createJWT()
  response.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  })
}

export { register, login, updateUser }