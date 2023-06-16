require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const authRoute = require('./routes/auth-route')
const adminProductRoute = require('./routes/adminProduct-route')
const guestRoute = require('./routes/guest-route')
// const friendRoute = require('./routes/friend-route')
// const postRoute = require('./routes/post-route')

const notFoundMiddleware = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/error')
const authenticate = require('./middlewares/authenticate')

const app = express();
app.use(cors())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(rateLimit({
    windowMs: 1000 * 60 * 1,
    max: 1000,
    message: { message: 'too many requests' }
}))

app.use(helmet())
app.use(express.json())

app.use('/auth', authRoute)
app.use('/guest', guestRoute)
app.use('/admin/product', authenticate, adminProductRoute)
// app.use('/cart',authenticate,)
// app.use('/posts', authenticate, postRoute)

app.use(notFoundMiddleware)
app.use(errorMiddleware)


const port = process.env.PORT || 8000;
app.listen(port, () => console.log('server running on port' + port))