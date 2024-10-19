const express = require('express')
const DetailsController = require('../controllers/DetailsController') 

const router = express.Router()

router.get('/get',DetailsController.getDetails)



module.exports = router;