const express = require('express')
const authenthicationMiddleware = require('../middleware/authenticationMiddleware')
const router = express.Router()
const { getLiveMatches , getSingleMatch  , getMatchesByDate } = require('../controllers/Match')
router.get('/' , authenthicationMiddleware , getLiveMatches)
router.get('/:id' , authenthicationMiddleware , getSingleMatch)
router.get('/FT/:date' , authenthicationMiddleware , getMatchesByDate)
//router.get('/NS' , authenthicationMiddleware , getUpcomingTodayMatches)


module.exports = router