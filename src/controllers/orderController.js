const { User, Cart, Product, ProductImage, Order, OrderItem } = require("../models")
const { upload } = require('../services/upload-service')
exports.createOrder = async (req, res, next) => {
    const userId = req.user.id
    const { totalPrice, address } = req.body

    try {
        const cart = await Cart.findAll({
            where: {
                userId
            },
            include: {
                model: Product
            }
        })

        const modifyCart = JSON.parse(JSON.stringify(cart))

        const order = await Order.create({ userId, totalPrice, address, status: "pending" })


        for (let item of modifyCart) {
            await OrderItem.create({ orderId: order.id, productId: item.productId, quantity: item.quantity, price: item.Product.price })
        }
        res.json(cart)

    } catch (err) {
        next(err)
    }
}

exports.getOrderByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const rs = await Order.findAll({
            include: [
                { model: User, where: { id: id }, attributes: ["id"] },
                {
                    model: OrderItem,
                    include: { model: Product, include: { model: ProductImage } }

                }
            ],
        });
        res.status(200).json(rs);
    } catch (err) {
        next(err);
    }
};

exports.updateOrder = (req, res, next) => {
    const { id } = req.params
    Order.update(req.body, {
        where: { id: id }

    }).then(rs => {
        res.json(rs)
    }).catch(next)
}

exports.uploadslip = async (req, res, next) => {
    try {
        const rs = await upload(req.files.image[0].path)
        res.json(rs.secure_url)
    } catch (err) {
        next(err)

    }

}