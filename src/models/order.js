module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        address: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        totalPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        paymentSlip: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('PENDING', 'SUCCESS', 'WAITING', 'COMPLETED'),
            allowNull: false
        },
    },
        {
            underscored: true,

        }
    )
    Order.associate = (models) => {
        Order.hasMany(models.OrderItem, {
            foreignKey: {
                name: 'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })


        Order.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })


    }
    return Order;
}