const errorHandlerMiddleware = (err , req , res , next) => {
  console.log(err.stack)

  const statusCode = err.statusCode || 500;
  const message = err.message || 'something went wrong please try again soon';


  res.status(statusCode).json({
    msg : message,
    statusCode
  })
}


module.exports = errorHandlerMiddleware