const mongoose = require("mongoose")
const bidModel = require("../../bid/bid-model")
const saleListingModel = require("../../sale-listing/sale-listing-model")

const buyerProfileSchema = mongoose.Schema({
    bids : [{
        type : String
        // ref : "bidModel"
    }],
    wishList : [{
        type : String
        // ref : "saleListingModel"
    }]
})

module.exports = buyerProfileSchema