const {StatusCodes} = require('http-status-codes');
const customApiError = require('./customApiError');

class BadRequest extends customApiError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

module.exports = BadRequest;