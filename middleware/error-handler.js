import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (error, request, response, next) => {
  console.log(error);
  const defaultError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || `Something went wrong, try again later`,
  }
  if (error.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.msg = Object.values(error.errors).map(item => item.message).join(', ')
  }

  if (error.code && error.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.msg = `${Object.keys(error.keyValue)}-field has already existed`
  }
  // response.status(defaultError.statusCode).json({ msg: error })
  response.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleware