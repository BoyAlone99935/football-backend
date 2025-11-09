const express = require('express');
const router = express.Router();
const authenthicationMiddleware = require('../middleware/authenticationMiddleware');
const { addFavoriteTeam, getFavouriteTeam, removeFavoriteTeam } = require('../controllers/User');
router.post('/AddFavoriteTeam', authenthicationMiddleware , addFavoriteTeam);
router.get('/GetFavouriteTeams', authenthicationMiddleware , getFavouriteTeam);
router.post('/RemoveFavoriteTeam', authenthicationMiddleware , removeFavoriteTeam);

module.exports = router;