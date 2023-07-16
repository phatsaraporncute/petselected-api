const { User, Cart, Product, ProductImage } = require("../models")

exports.getCart = async (req, res, next) => {
    try {

        const { id } = req.params;

        const carts = await Cart.findAll({
            include: [
                {
                    model: User,
                    where: { id: id },
                    attributes: ["id"],
                },
                {
                    model: Product,
                    include: ProductImage,
                }
            ]
        });
        res.status(200).json({ carts });
    } catch (err) {
        next(err);
    }
}

exports.createCart = (req, res, next) => {
    // validation
    const { quantity, productId, userId } = req.body
    // console.log(quantity, productId, userId)
    Cart.create(req.body).then(rs => {
        res.json(rs)
    }).catch(next)
}

exports.updateAddCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        // console.log("===",req.body)
        // console.log(userId)
        const { productId, addQuantity } = req.body
        // console.log(productId)
        const result = await Cart.findOne({
            where: { productId, userId }
        })

        if (!result) {
            const addCart = await Cart.create({ userId, productId, quantity: 1 })
        } else {
            result.quantity += +addQuantity
            await result.save()  // create และ update ไห้เลย เป็น instant method 

        }

        const rs = await Cart.findAll({
            where: { userId }, include: Product
        })
        res.status(200).json(rs);
    } catch (err) {
        console.error(err)
        next(err)
    }
}

exports.updateOneAddCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        // console.log("===",req.body)
        // console.log(userId)
        const { productId } = req.body
        // console.log(productId)
        const result = await Cart.findOne({
            where: { productId, userId }
        })

        if (!result) {
            const addCart = await Cart.create({ userId, productId, quantity: 1 })
        } else {
            result.quantity += 1
            await result.save()  // create และ update ไห้เลย เป็น instant method 
        }

        const rs = await Cart.findAll({
            where: { userId }, include: Product
        })
        res.status(200).json(rs);
    } catch (err) {
        console.error(err)
        next(err)
    }
}

exports.deleteCart = (req, res, next) => {
    const { id } = req.user
    Cart.destroy({
        where: { userId: id }
    }).then(rs => {
        if (rs === 0) {
            throw new Error('Cannot Delete!')
        }
        res.json(rs)
    }).catch(next)
}

exports.deleteCartById = (req, res, next) => {
    const { id } = req.params
    Cart.destroy({
        where: { id: id }
    }).then(rs => {
        if (rs === 0) {
            throw new Error('Cannot Delete!')
        }
        res.json(rs)
    }).catch(next)
}


// exports.checkout = async (req, res, next) => {
//     try {
//         const value = req.body;
//         console.log(value)
//         value.userId = req.user.userId;
//         console.log('value', value)
//         const existingItem = await Cart.findAll({ where: { userId: value.userId } })
//         const modify = JSON.parse(JSON.stringify(existingItem))
//         const { orderId } = await Order.create()
//         const rs = modify.map(el => {
//             delete el.cartId
//             el['orderId'] = orderId
//             return el
//         })
//         const rs1 = await modify.map(el => OrderItem.create(el))
//         const delCart = await Cart.destroy({ where: { userId: value.userId } })
//         res.status(200).json({ orderId: orderId })
//     } catch (err) { next(err); }

// };