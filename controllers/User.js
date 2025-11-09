const userModel = require('../models/User');
const getFavouriteTeam = async (req , res) => {
  const faveteams = await userModel.findById(req.user.userId).select('FavouriteTeams');
  res.status(200).json({faveteams});
}


const addFavoriteTeam = async (req , res) => {
  const {team} = req.body;
  const favTeam = await userModel.findByIdAndUpdate(
      req.user.userId,
      { $addToSet: { FavouriteTeams: { $each: team } } },
      { new: true }
    );
  res.status(200).json({favTeam});
}


const removeFavoriteTeam = async (req , res) => {
  const {team} = req.body;
  const favTeam = await userModel.findByIdAndUpdate(req.user.userId , {$pull : {FavouriteTeams : team}} , {new : true , runValidators : true});

  res.status(200).json({favTeam});
}


module.exports = {
  getFavouriteTeam,
  addFavoriteTeam,
  removeFavoriteTeam,
};