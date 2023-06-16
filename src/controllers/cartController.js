// const { User, Cart } = require("../models")

// exports.getCart = (req, res, next) => {
//     Cart.findAll({}).then(rs => {
//         res.json(rs)
//     }).catch(next)
// }

// exports.createCart = (req, res, next) => {
//     // validation
//     const { quantity, productId, userId } = req.body
//     Cart.create(req.body).then(rs => {
//         res.json(rs)
//     }).catch(next)
// }