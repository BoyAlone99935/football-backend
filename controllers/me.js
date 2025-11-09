const userModel = require('../models/User')
const {BadRequest} = require('../Errors/index')
const StatusCodes = require('http-status-codes')
const bcrypt = require('bcryptjs')
const getUserDetails = async (req , res) => {
  const userDetails = await userModel.findById(req.user.userId)
  if (!userDetails) {
    BadRequest('no user found')
  }
  res.status(200).json({userDetails});
}


const updatePassword = async (req, res) => {
  const userId = req.user.userId; 
  const { currentPassword  , newPassword } = req.body;
  

  if (!currentPassword || !newPassword) {
    return res.status(StatusCodes.StatusCodes.BAD_REQUEST).json({ msg: 'All fields are required' });
  }

  try {
    const user = await userModel.findById(userId).select('+password'); // select password explicitly

    if (!user) {
      return res.status(StatusCodes.StatusCodes.UNAUTHORIZED).json({ msg: 'User not found' });
    }

    // verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(StatusCodes.StatusCodes.UNAUTHORIZED).json({ msg: 'Current password is incorrect' });
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(StatusCodes.StatusCodes.OK).json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
  }
};




module.exports = {getUserDetails , updatePassword};