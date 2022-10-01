import { UnauthenticatedError } from "../errors/index.js"
import jwt from "jsonwebtoken"

export default async function authenticatedUser(request, response, next) {
  const authHeader = request.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    // payload here is `id` in user, which is used in jwt.sign() to create token in user model
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    request.user = { userId: payload.id }
    next()
  } catch (error) {
    throw new UnauthenticatedError(`Invalid Token`)
  }

}