const mongoose = require("mongoose")
const bidModel = require("../../bid/bid-model")
const saleListingModel = require("../../sale-listing/sale-listing-model")

const buyerProfileSchema = mongoose.Schema({
    bids : [{
        type : mongoose.Types.ObjectId,
        ref : "bidModel"
    }],
    wishList : [{
        type : mongoose.Types.ObjectId,
        ref : "saleListingModel"
    }]
})

module.exports = buyerProfileSchema