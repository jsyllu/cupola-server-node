const mongoose = require("mongoose")
const currencies = require("../currency/currency-enum")
const propertyModel = require("../property/property-model")

const saleListingSchema = mongoose.Schema({
    pid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "propertyModel",
        required : true
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    updatedAt : {
        type : Date,
        default : new Date()
    },
    price : Number, // price
    currency : {
        type : String,
        enum : currencies
    } // USD
}, {collection : "saleListings"})

module.exports = saleListingSchema