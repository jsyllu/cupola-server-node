// https://mongoosejs.com/docs/api.html#schematype_SchemaType-ref
const PropertyModel = require("../property/property-model")
const mongoose = require("mongoose")
const currencies = require("../currency/currency-enum")

const rentalListingSchema = mongoose.Schema({
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
    monthlyRent : Number, // price
    currency : {
        type : String,
        enum : currencies
    } // USD
}, {collection : "rentalListings"})

module.exports = rentalListingSchema