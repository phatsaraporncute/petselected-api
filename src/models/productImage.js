module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
        mainImg: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descriptionImg: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        howtoImg: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            underscored: true,

        }
    )

    ProductImage.associate = (models) => {
        ProductImage.belongsTo(models.Product, {
            foreignKey: {
                name: 'productId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })

    }
    return ProductImage;
}