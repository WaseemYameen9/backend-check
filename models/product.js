const mongoose = require("mongoose");

const schema = mongoose.Schema({
    imageLink: [String],
    title: String,
    description: String,
    category:String,
    subcategoryslug: String,
    price: Number,
    discountedPrice: Number,
    reviews: Number,
    rating: Number,
    sizes: [String],
},{timestamps:true})

module.exports = mongoose.model('Products',schema)