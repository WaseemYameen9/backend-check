const express = require('express')
const CartController = require('../controllers/CartController')
const authMiddleware = require('../middleware/Auth')


const router = express.Router()

router.post('/addProduct' , CartController.addProductToCart)
router.get('/getCartItems/:userId', CartController.getCartItems)
router.delete('/deletecartitem', CartController.RemoveItemFromCart)

module.exports = router