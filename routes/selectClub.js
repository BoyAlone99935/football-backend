const express = require('express')
const authenthicationMiddleware = require('../middleware/authenticationMiddleware')
const router = express.Router()
const getTeamsbyLeauge = require('../controllers/selectClub')

router.get('/getTeams/:id' , authenthicationMiddleware , getTeamsbyLeauge)

module.exports = router