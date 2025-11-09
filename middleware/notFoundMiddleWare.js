const statusCodes = require('http-status-codes');
const notFoundMiddleWare = (req , res , next) => {
  res.status(statusCodes.StatusCodes.NOT_FOUND).json({msg : "route does not exist"})
}


module.exports = notFoundMiddleWare;