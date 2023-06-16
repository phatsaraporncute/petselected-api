module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        {
            underscored: true,

        }
    )
    Product.associate = (models) => {
        Product.hasMany(models.OrderItem, {
            foreignKey: {
                name: 'productId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })

        Product.hasMany(models.Cart, {
            foreignKey: {
                name: 'productId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })

        Product.hasMany(models.ProductImage, {
            foreignKey: {
                name: 'productId',
                allowNull: false
            },
            onDelete: 'CASCADE'
        })

        Product.belongsTo(models.Category, {
            foreignKey: {
                name: 'categoryId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })

    }
    return Product;
}