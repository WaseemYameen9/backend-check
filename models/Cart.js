const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    totalItems: Number,
    totalBill: Number,
    discountedBill: Number,
    products : [{
        productId:{
            type: mongoose.Types.ObjectId ,
            ref: 'products'
        },
        qty: Number,
        size: String 
    }]
},{timestamps:true})

module.exports = mongoose.model('Cart',schema)