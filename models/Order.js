const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User'},
    firstName: String,
    lastName: String,
    email: String,
    country: String,
    address: String,
    apartmentSuite: String,
    city: String,
    postalCode: String,
    phone: String,
    paymentMethod: String,
    OrderStatus: String,
    totalItems: Number,
    totalBill: Number,
    discountedBill: Number,
    products : [{
        productId:{
            type: mongoose.Types.ObjectId ,
            ref: 'Products'
        },
        qty: Number,
        size: String 
    }]
},{timestamps:true})

module.exports = mongoose.model('Order',schema)