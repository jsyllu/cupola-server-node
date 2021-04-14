const mongoose = require("mongoose")
const propertyTransactionShcema = require("./property-transaction/property-transaction-schema")
const propertyLocationSchema = require("./property-location/property-location-schema")
const propertyTypes = require("./property-type/property-type-enum")
const CustomerModel = require("../customer/customer-model")

const propertySchema = mongoose.Schema({
    uid : {
        type : mongoose.Types.ObjectId,
        ref : CustomerModel,
        required : true
    },
    location : propertyLocationSchema,
    type : {
        type : String,
        enum : propertyTypes
    },
    size : Number,
    beds : Number,
    baths : Number,
    yearBuilt : Number,
    hasBasement : Boolean,
    hasParking : Boolean,
    hasHeating : Boolean,
    hasAC : Boolean,
    gallery : [String], // image urls
    zillowId : String,
    transactionHistory : [propertyTransactionShcema]
})

module.exports = propertySchema