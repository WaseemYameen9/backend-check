const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Products'
    },
    userName: String,
    review:String,
    rating: Number
},{timestamps:true})

module.exports = mongoose.model('Reviews',schema)