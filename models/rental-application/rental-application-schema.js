const mongoose = require("mongoose")
const status = require("../status/status-enum")
const CustomerModel = require("../customer/customer-model")

const rentalApplicationShcema = mongoose.Schema({
    renterId : {
        type : mongoose.Types.ObjectId,
        ref : CustomerModel
    },
    lenderId : {
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
    deposit : Number,
    status : {
        type : String,
        enum : status
    }
}, {collection : "rentalApplications"})

module.exports = rentalApplicationShcema