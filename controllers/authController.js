import { UNSAFE_NavigationContext } from "react-router-dom"
import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors/Index.js"

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
  response.send(`login user`)
}

const updateUser = async (request, response) => {
  response.send(`updateUser user`)
}

export { register, login, updateUser }