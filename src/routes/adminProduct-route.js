const express = require('express')
const adminProductController = require('../controllers/adminProductController')
const router = express.Router()


router.post('/addproduct', adminProductController.createProduct)
router.delete('/:id', adminProductController.deleteProduct)
router.put('/:id', adminProductController.updateProduct)
router.get('/:id', adminProductController.getProductById)
router.get('/', adminProductController.getAllProduct)

module.exports = router