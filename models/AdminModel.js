const mongoose = require("mongoose");

const schema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
},{timestamps:true})

module.exports = mongoose.model('Admin',schema)