const customApiError = require('./customApiError');
const { StatusCodes } = require('http-status-codes');

class   Unauthorized extends customApiError {
  constructor(message) {
    super(message , StatusCodes.UNAUTHORIZED)
  }
}

module.exports = Unauthorized;