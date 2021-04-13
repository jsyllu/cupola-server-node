const mongoose = require("mongoose")
const status = require("../status/status-enum")
const bidSchema = mongoose.Schema({
    buyerId : {
        type : mongoose.Types.ObjectId,
        ref : "CustomerModel"
    },
    sellerId : {
        type : mongoose.Types.ObjectId,
        ref : "CustomerModel"
    },
    createdAt : Date,
    updatedAt : Date,
    offerPrice : Number,
    down : Number,
    status : {
        type : String,
        enum : status
    }
}, {collection : "bids"})

module.exports = bidSchema
