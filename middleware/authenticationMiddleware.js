const jwt = require('jsonwebtoken');
const {Unauthorized} = require('../Errors/index');
require('dotenv').config();
const authenthicationMiddleware = async (req , res , next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Unauthorized('authentication invalid');
  } else {
    const token = authHeader.split(' ')[1];
   try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    req.user = {userId : decoded.userId , username : decoded.username}
    next();
   } catch(err) {
    throw new Unauthorized('Token is invalid or expired');
   }
  }
}


module.exports = authenthicationMiddleware;