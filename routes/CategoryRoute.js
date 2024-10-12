const express = require('express')
const CategoryController = require('../controllers/CategoryController')
const authMiddleware = require('../middleware/Auth')

const router = express.Router()

router.post('/create-sub-category',authMiddleware,CategoryController.CreateSubCategory)
router.get('/get',CategoryController.getCategoriesAndSubCategories)


module.exports = router;