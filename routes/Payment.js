const express = require('express')
const PaymentController = require('../controllers/PaymentController')

const router = express.Router()

router.post('/create-payment-intent' , PaymentController.ProcessPayment)

module.exports = router