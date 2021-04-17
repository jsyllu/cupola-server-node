// https://mongoosejs.com/docs/api.html#schematype_SchemaType-ref
const PropertyModel = require("../property/property-model")
const mongoose = require("mongoose")
const currencies = require("../currency/currency-enum")

const rentalListingSchema = mongoose.Schema({
    pid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : PropertyModel,
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
    monthlyRent : Number,
    currency : {
        type : String,
        enum : currencies
    }
}, {collection : "rentalListings"})

module.exports = rentalListingSchema