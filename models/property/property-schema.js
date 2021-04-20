const mongoose = require("mongoose")
const propertyTransactionShcema = require("./property-transaction/property-transaction-schema")
const propertyTypes = require("./property-type/property-type-enum")
const propertyDetailSchema = require("./property-detail/property-detail-schema")
const customerModel = require("../customer/customer-model")

const propertySchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    uid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "customerModel",
        required : true,
        default : mongoose.Types.ObjectId("607895710da0953e57c44f52")
    },
    zillowId : String, // zpid
    size : Number,  // livingArea
    beds : Number, // bedrooms
    baths : Number, // bathrooms
    type : {
        type : String,
        enum : propertyTypes
    }, // propertyType   
    price : Number, // price
    transactionHistory : [propertyTransactionShcema], // undefined
    details : {
        type : propertyDetailSchema,
        default: undefined
    },
    "longitude": Number, // longitude
    "latitude": Number, // latitude
    "address": String, // address
}, {collection : "properties"})



// const propertySchema = mongoose.Schema({
//     uid : {
//         type : mongoose.Schema.Types.ObjectId,
//         ref : "customerModel",
//         required : true
//     }, // 607895710da0953e57c44f52
//     location : propertyLocationSchema,
//     type : {
//         type : String,
//         enum : propertyTypes
//     }, // homeType
//     size : Number,  // livingArea
//     beds : Number, // bedrooms
//     baths : Number, // bathrooms
//     yearBuilt : Number, // yearBuilt
//     hasBasement : Boolean, // basement !=== undefined || basement !== null
//     hasParking : Boolean, // parking (number)
//     hasHeating : Boolean, // hasHeating
//     hasAC : Boolean, // hasCooling === true
//     gallery : [String], // image urls - another zilllowApi call object.images
//     zillowId : String, // zpid
//     transactionHistory : [propertyTransactionShcema] // undefined
// })

module.exports = propertySchema