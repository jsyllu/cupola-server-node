const mongoose = require("mongoose")
const currencies = require("../currency/currency-enum")
const propertyModel = require("../property/property-model")

const saleListingSchema = mongoose.Schema({
    pid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "propertyModel",
        require : true
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    updatedAt : {
        type : Date,
        default : new Date()
    },
    price : Number,
    currency : {
        type : String,
        enum : currencies
    }
}, {collection : "saleListings"})

module.exports = saleListingSchema