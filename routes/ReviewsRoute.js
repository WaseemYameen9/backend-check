const express = require('express')
const reviewcontroller = require('../controllers/ReviewController')

const router = express.Router()

router.post('/create', reviewcontroller.AddReview)
router.get('/get/:productid', reviewcontroller.getReviewsofProduct)

module.exports = router;

