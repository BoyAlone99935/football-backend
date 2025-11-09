const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  } , 
  email : {
    type : String,
    required : true,
    unique : true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  } , 
  password : {
    type : String,
    required : true,
    minlength : 4 ,
    maxlength : 70,
    select: false
  } , 
  FavouriteTeams: {
  type: [String],
  default: []
}
} , {timestamps: true})


userSchema.pre('save' , async function(next) {
  if(!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password , salt)
  next()
})


userSchema.methods.createJWT = function() {
  return jwt.sign({userId : this._id , username : this.username} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_LIFETIME})
}


userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword , this.password)
}

module.exports = mongoose.model('User', userSchema);