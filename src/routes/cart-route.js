const express = require('express')
const cartController = require('../controllers/cartController')
const router = express.Router()

router.get('/:id', cartController.getCart)
router.post('/createcart', cartController.createCart)
router.put('/updatecart/', cartController.updateAddCart)
router.put('/updatecart1/:id', cartController.updateOneAddCart)
router.delete('/deletecart', cartController.deleteCart)
router.delete('/deletecart/:id', cartController.deleteCartById)

module.exports = router