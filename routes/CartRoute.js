const express = require('express')
const CartController = require('../controllers/CartController')
const authMiddleware = require('../middleware/Auth')


const router = express.Router()

router.post('/addProduct', authMiddleware , CartController.addProductToCart)
router.get('/getCartItems/:userId', authMiddleware, CartController.getCartItems)
router.delete('/deletecartitem', authMiddleware, CartController.RemoveItemFromCart)

module.exports = router