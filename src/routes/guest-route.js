const express = require('express')
const adminProductController = require('../controllers/adminProductController')
const router = express.Router()

router.get('/', adminProductController.getAllProduct)
router.get('/:id', adminProductController.getProductById)

module.exports = router