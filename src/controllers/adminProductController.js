const uploadService = require('../services/upload-service');
const fs = require('fs')

const { Product, ProductImage, User, Category, sequelize } = require('../models');


exports.createProduct = (req, res, next) => {
    // validation
    const { productName, price, description, quantity, size, weight, material, categoryId } = req.body
    Product.create(req.body).then(rs => {
        res.json(rs)
    }).catch(next)
}

exports.getAllProduct = (req, res, next) => {
    Product.findAll({
        include: [{
            model: ProductImage
        }]
    }).then(rs => {
        res.json(rs)
    }).catch(next)
}

exports.getProductById = (req, res, next) => {
    const { id } = req.params
    Product.findOne({
        attributes: ["productName", "price", "description", "quantity", "size", "weight", "material", "categoryId"],
        where: { id: id },
        include: [{
            model: ProductImage
        }]
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
    Product.update(req.body, {
        where: { id: id }
    }).then(rs => {
        res.json(rs)
    }).catch(next)
}


exports.uploadImage = async (req, res, next) => {
    const { productId } = req.params
    try {
        if (!req.files.mainImg && !req.files.descriptionImg && !req.files.howtoImg) {
            throw new Error('product image is required.')
        }
        const updateValue = {}
        if (req.files.mainImg) {
            const result = await uploadService.upload(req.files.mainImg[0].path);
            updateValue.mainImg = result.secure_url
        }
        if (req.files.descriptionImg) {
            const result = await uploadService.upload(req.files.descriptionImg[0].path);
            updateValue.descriptionImg = result.secure_url
        }
        if (req.files.howtoImg) {
            const result = await uploadService.upload(req.files.howtoImg[0].path);
            updateValue.howtoImg = result.secure_url
        }
        // console.log(req.file);
        // console.log(req.files);
        // console.log(result);
        await ProductImage.create({ ...updateValue, productId }, { where: { id: productId } })
        res.status(200).json(updateValue)
    } catch (err) {
        next(err);
    } finally {
        if (req.files.mainImg) {
            fs.unlinkSync(req.files.mainImg[0].path)
        }
        if (req.files.descriptionImg) {
            fs.unlinkSync(req.files.descriptionImg[0].path)
        }
        if (req.files.howtoImg) {
            fs.unlinkSync(req.files.howtoImg[0].path)
        }
    }
};