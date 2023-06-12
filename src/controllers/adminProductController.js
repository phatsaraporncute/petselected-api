const { Product, ProductImage, User, Category, sequelize } = require('../models')

exports.createProduct = (req, res, next) => {
    // validation
    const { productName, price, description, quantity, size, weight, material, categoryId } = req.body
    Product.create(req.body).then(rs => {
        res.json(rs)
    }).catch(next)
}

exports.getAllProduct = (req, res, next) => {
    Product.findAll({
    }).then(rs => {
        res.json(rs)
    }).catch(next)
}

exports.getProductById = (req, res, next) => {
    const { id } = req.params
    Product.findOne({
        attributes: ["productName", "price", "description", "quantity", "size", "weight", "material", "categoryId"],
        where: { id: id }
    }).then(rs => {
        res.json(rs)
    }).catch(next)
}

exports.deleteProduct = (req, res, next) => {
    const { id } = req.params
    Product.destroy({
        where: { id: id }
    }).then(rs => {
        if (rs === 0) {
            throw new Error('Cannot Delete!')
        }
        res.json(rs)
    }).catch(next)
}

exports.updateProduct = (req, res, next) => {
    const { id } = req.params
    Product.update({ ...req.body, userId: req.user.id }, {
        where: { id: id }
    }).then(rs => {
        res.json(rs)
    }).catch(next)
}