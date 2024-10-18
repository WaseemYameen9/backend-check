const express  = require('express')
const db = require('./services/db')
const AuthRouter = require('./routes/AuthRoute')
const ProductRouter = require('./routes/ProductRoute')
const CategoryRouter = require('./routes/CategoryRoute')
const ReviewRouter = require('./routes/ReviewsRoute')
const CartRouter = require('./routes/CartRoute')
const OrderRouter = require('./routes/OrderRoute')
const Payment = require('./routes/Payment')
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app  = express()

app.use(cookieParser());
app.use(express.json())
const allowedOrigins = [
  'https://clothswebsite.vercel.app',
  'https://www.theuniquesunnah.com', // Frontend production URL
  'https://www.admin.theuniquesunnah.com', // Frontend production URL
  'http://localhost:3000',
  'http://localhost:5173', // For local development, adjust as needed
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);




app.use('/user', AuthRouter)
app.use('/product', ProductRouter)
app.use('/category', CategoryRouter)
app.use('/review', ReviewRouter)
app.use('/cart', CartRouter)
app.use('/order', OrderRouter)
app.use('/payment', Payment)


module.exports = app;