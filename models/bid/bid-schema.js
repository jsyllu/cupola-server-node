const mongoose = require("mongoose")
const status = require("../status/status-enum")
const customerModel = require("../customer/customer-model")

const bidSchema = mongoose.Schema({
    buyerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "customerModel"
    },
    sellerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "customerModel"
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    updatedAt : {
        type : Date,
        default : new Date()
    },
    offerPrice : Number,
    down : Number,
    status : {
        type : String,
        enum : status
    }
}, {collection : "bids"})

module.exports = bidSchema
