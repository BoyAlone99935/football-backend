const userModel = require('../models/User')
const {BadRequest} = require('../Errors/index');
const User = require('../models/User');
const {StatusCodes} = require('http-status-codes'); 


const registerUser = async (req , res) =>{
  const {username , email , password} = req.body;
  try {
    if(!username || !email || !password){
    throw new BadRequest('Please provide all values')
  }
  const user = await userModel.create({username , email , password})
  const token = user.createJWT()

  res.status(201).json({user , token})
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}


const loginUser = async (req , res) =>{
 const {email , password} = req.body;
 if (email === "" || password === "") {
  throw new BadRequest('Please provide all values')
 }
 const user = await userModel.findOne({email}).select('+password')
 if (!user) {
  throw new BadRequest('Invalid Credentials')
 }
 const isMatch = await user.comparePassword(password)
 if (!isMatch) {
  throw new BadRequest('Incorrect password')
 } else {
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({user , token , msg: 'Login Successful'})
 }
}


module.exports = {
  registerUser,
  loginUser
}