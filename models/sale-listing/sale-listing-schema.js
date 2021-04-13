const mongoose = require("mongoose")
const currencies = require("../currency/currency-enum")
const saleListingSchema = mongoose.Schema({
    pid : {
        type : mongoose.Types.ObjectId,
        ref : "PropertyModel",
        require : true
    },
    createdAt : Date,
    updatedAt : Date,
    price : Number,
    currency : {
        type : String,
        enum : currencies
    },
    hoa : Number,
    certificateOfOwnership : String,
    ownership : Boolean
}, {collection : "saleListings"})

module.exports = saleListingSchema