const mongoose = require("mongoose");

const schema = mongoose.Schema({
    category: String,
    categorySlug: String,
    subCategories : [{
        name: String,
        slug: String
    }]
},{timestamps:true})

module.exports = mongoose.model('Category',schema)