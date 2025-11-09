const { StatusCodes } = require('http-status-codes')
class customApiError extends Error {
  constructor(message , statusCode) {
    super(message);
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  }
}


module.exports = customApiError

