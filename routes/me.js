const express = require('express')
const authenthicationMiddleware = require('../middleware/authenticationMiddleware')
const router = express.Router()
const  {getUserDetails , updatePassword}  = require('../controllers/me')
router.get('/details' , authenthicationMiddleware , getUserDetails)
router.post('/updatePassword' , authenthicationMiddleware , updatePassword )

module.exports = router