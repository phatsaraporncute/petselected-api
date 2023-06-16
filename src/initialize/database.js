const { sequelize, User, Category, Product, ProductImage } = require('../models')

sequelize.sync({ force: true })
// const bcrypt = require("bcryptjs");
// const password = bcrypt.hash('123456', 1)

// const mockData = async () => {
//     await sequelize.sync({ force: true })

//     await User.bulkCreate([
//         {
//             firstName: "cute",
//             lastName: "baei",
//             email: "a@gmail.com",
//             password: password,
//             role: "ADMIN"

//         },
//         {
//             firstName: "cute",
//             lastName: "cute",
//             email: "aa@gmail.com",
//             password: password,
//             role: "USER"

//         },
//         {
//             firstName: "baei",
//             lastName: "cute",
//             email: "aaa@gmail.com",
//             password: password,
//             role: "USER"

//         }
//     ])

//     await Product.bulkCreate([
//         {
//             productName: "Lorem Ipsum1",
//             price: "4500",
//             description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
//             quantity: "26",
//             size: "23 x 24 x 25",
//             weight: "23 kg",
//             material: "ABS, Tempered Glass",
//         },
//         {
//             productName: "Lorem Ipsum2",
//             price: "5500",
//             description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,",
//             quantity: "34",
//             size: "23 x 28 x 25",
//             weight: "63 kg",
//             material: "ABS, Tempered Glass",
//         },
//         {
//             productName: "Lorem Ipsum3",
//             price: "5500",
//             description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has ",
//             quantity: "36",
//             size: "23 x 28 x 25",
//             weight: "23 kg",
//             material: "ABS, Tempered Glass",
//         },
//         {
//             productName: "Lorem Ipsum4",
//             price: "12000",
//             description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has ",
//             quantity: "20",
//             size: "23 x 28 x 25",
//             weight: "28 kg",
//             material: "ABS, Tempered Glass",
//         },
//         {
//             productName: "Lorem Ipsum5",
//             price: "12000",
//             description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using  ",
//             quantity: "20",
//             size: "23 x 28 x 25",
//             weight: "28 kg",
//             material: "ABS, Tempered Glass",
//         },
//         {
//             productName: "Lorem Ipsum6",
//             price: "12000",
//             description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its. ",
//             quantity: "89",
//             size: "23 x 28 x 27",
//             weight: "70 kg",
//             material: "ABS, Tempered Glass",
//         },
//         {
//             productName: "Lorem Ipsum7",
//             price: "14000",
//             description: "It is a long established fact that a reader will be distracted by the readable. ",
//             quantity: "89",
//             size: "23 x 28 x 27",
//             weight: "45 kg",
//             material: "ABS, Tempered Glass",
//         }
//     ])

//     await Category.bulkCreate([
//         {
//             name: "Clean"
//         },
//         {
//             name: "Feed"
//         },
//         {
//             name: "Drink"
//         },
//         {
//             name: "Fun"
//         },
//         {
//             name: "Accessories"
//         },


//     ])
// }

// try {
//     mockData()
// } catch (err) {
//     console.log(err)
// }