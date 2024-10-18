const express = require('express')
const CategoryController = require('../controllers/CategoryController')
const authMiddleware = require('../middleware/Auth')

const router = express.Router()

router.post('/create-category',CategoryController.CreateSubCategory)
router.post('/create-sub-category',CategoryController.CreateSubCategoryInCategory)
router.post('/create-sub-categoryy',CategoryController.CreateSubCategoryInCategory)
router.get('/get',CategoryController.getCategoriesAndSubCategories)
router.get('/get-admin',CategoryController.getCategoriesAndSubCategories)


module.exports = router;