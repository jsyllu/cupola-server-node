const mongoose = require("mongoose")
const status = require("../status/status-enum")
const CustomerModel = require("../customer/customer-model")

const bidSchema = mongoose.Schema({
    buyerId : {
        type : mongoose.Types.ObjectId,
        ref : CustomerModel
    },
    sellerId : {
        type : mongoose.Types.ObjectId,
        ref : CustomerModel
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
