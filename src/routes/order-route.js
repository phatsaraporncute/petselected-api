const express = require('express')
const orderController = require('../controllers/orderController')
const upload = require('../middlewares/upload')


const router = express.Router()

router.post('/createorder', orderController.createOrder)
router.get('/:id', orderController.getOrderByUserId)
router.patch('/updateorder/:id', orderController.updateOrder)
router.put('/uploadslip', upload.fields([
    { name: 'image', maxCount: 1 }
]), orderController.uploadslip)
module.exports = router