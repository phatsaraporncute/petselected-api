const express = require('express')
const adminProductController = require('../controllers/adminProductController')
const upload = require('../middlewares/upload')
const router = express.Router()


router.post('/addproduct', adminProductController.createProduct)
router.delete('/:id', adminProductController.deleteProduct)
router.put('/:id', adminProductController.updateProduct)
router.get('/:id', adminProductController.getProductById)
router.get('/', adminProductController.getAllProduct)

router.patch('/image/:productId',
    upload.fields([
        { name: 'mainImg', maxCount: 1 },
        { name: 'descriptionImg', maxCount: 1 },
        { name: 'howtoImg', maxCount: 1 }
    ]),
    adminProductController.uploadImage)

module.exports = router









