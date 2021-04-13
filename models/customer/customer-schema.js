const mongoose = require("mongoose")
const customerSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    firstName : String,
    lastName : String,
    phone : Number,
    email : String
}, {collection : "customers"})

module.exports = customerSchema