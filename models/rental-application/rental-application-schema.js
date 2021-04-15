const mongoose = require("mongoose")
const status = require("../status/status-enum")
const customerModel = require("../customer/customer-model")

const rentalApplicationShcema = mongoose.Schema({
    renterId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "customerModel"
    },
    lenderId : {
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
    deposit : Number,
    status : {
        type : String,
        enum : status
    }
}, {collection : "rentalApplications"})

module.exports = rentalApplicationShcema