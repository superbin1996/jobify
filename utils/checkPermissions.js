import { UnauthenticatedError } from "../errors/index.js"

const checkPermissions = ( requestUser, createdUser ) => {

  // Check if id from admin
  // if (requestUser.role === 'admin') return

  if (requestUser.userId === createdUser.toString()) return
  throw new UnauthenticatedError(`Not authorized to access this route`)
}
export default checkPermissions