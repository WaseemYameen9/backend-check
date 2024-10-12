const express  = require('express')
const db = require('./services/db')
const AuthRouter = require('./routes/AuthRoute')
const ProductRouter = require('./routes/ProductRoute')
const CategoryRouter = require('./routes/CategoryRoute')
const ReviewRouter = require('./routes/ReviewsRoute')
const CartRouter = require('./routes/CartRoute')
const OrderRouter = require('./routes/OrderRoute')
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app  = express()

app.use(cookieParser());
app.use(express.json())
app.use(
    cors({
      origin: function (origin, callback) {
        return callback(null, true);
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


// app.listen(5000, ()=>{
//     console.log('server is listening on port 5000')
// })

module.exports = app;
