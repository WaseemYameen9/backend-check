const express = require('express')
const OrderController = require('../controllers/OrderController')

const router = express.Router()

router.post('/create', OrderController.createOrder)
router.get('/get', OrderController.getAllOrders)
router.get('/get/:userId', OrderController.getOrderofCst)
router.get('/getbyid/:orderId', OrderController.getOrderbyId)

module.exports = router
