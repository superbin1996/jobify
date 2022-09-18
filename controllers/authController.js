import { UNSAFE_NavigationContext } from "react-router-dom"
import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnauthenticatedError } from "../errors/Index.js"

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

const login = async (req, res) => {
  const { email, password } = req.body
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
  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const updateUser = async (request, response) => {
  response.send(`updateUser user`)
}

export { register, login, updateUser }