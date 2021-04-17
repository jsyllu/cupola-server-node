const mongoose = require("mongoose")
const propertyTransactionShcema = require("./property-transaction/property-transaction-schema")
const propertyLocationSchema = require("./property-location/property-location-schema")
const propertyTypes = require("./property-type/property-type-enum")
const customerModel = require("../customer/customer-model")

const propertySchema = mongoose.Schema({
    uid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "customerModel",
        required : true
    }, // 607895710da0953e57c44f52
    location : propertyLocationSchema,
    type : {
        type : String,
        enum : propertyTypes
    }, // homeType
    size : Number,  // livingArea
    beds : Number, // bedrooms
    baths : Number, // bathrooms
    yearBuilt : Number, // yearBuilt
    hasBasement : Boolean, // basement !=== undefined || basement !== null
    hasParking : Boolean, // parking (number)
    hasHeating : Boolean, // hasHeating
    hasAC : Boolean, // hasCooling === true
    gallery : [String], // image urls - another zilllowApi call object.images
    zillowId : String, // zpid
    transactionHistory : [propertyTransactionShcema] // undefined
})

module.exports = propertySchema