const mongoose = require("mongoose")
const bidModel = require("../../bid/bid-model")
const saleListingModel = require("../../sale-listing/sale-listing-model")

const buyerProfileSchema = mongoose.Schema({
    bids : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "bidModel"
    }],
    wishList : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "saleListingModel"
    }]
})

module.exports = buyerProfileSchema