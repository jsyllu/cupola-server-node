const mongoose = require("mongoose")
const status = require("../status/status-enum")
const rentalApplicationShcema = mongoose.Schema({
    renterId : {
        type : mongoose.Types.ObjectId,
        ref : "CustomerModel"
    },
    lenderId : {
        type : mongoose.Types.ObjectId,
        ref : "CustomerModel"
    },
    createdAt : Date,
    updatedAt : Date,
    offerPrice : Number,
    deposit : Number,
    status : {
        type : String,
        enum : status
    }
}, {collection : "rentalApplications"})

module.exports = rentalApplicationShcema