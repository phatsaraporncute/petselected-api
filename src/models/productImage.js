module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
        mainImg: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        descriptionImg: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        howtoImg: {
            type: DataTypes.STRING,
            allowNull: true,
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
            onDelete: 'CASCADE'
        })

    }
    return ProductImage;
}