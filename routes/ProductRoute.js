const express = require('express')
const ProductController = require('../controllers/ProductController')
const multer = require('multer');

const router = express.Router()

const storage = multer.memoryStorage();  // Store files in memory for uploading to Cloudinary
const upload = multer({ storage: storage });

router.post('/create', upload.array('images[]', 5) ,ProductController.CreateProduct)
router.get('/get', ProductController.GetProducts)
router.get('/get/:category/:subcategory', ProductController.getProductsBySubCategory)
router.get('/get/:category', ProductController.getProductsByCategory)
router.get('/get/:id', ProductController.GetProduct)
router.put('/update/:id', ProductController.UpdateProduct)
router.delete('/delete/:id', ProductController.DeleteProduct)


module.exports = router;