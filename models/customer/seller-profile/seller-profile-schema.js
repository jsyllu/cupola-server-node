const mongoose = require("mongoose")
const saleListingModel = require("../../sale-listing/sale-listing-model")
const bidModel = require("../../bid/bid-model")
const sellerProfileSchema = mongoose.Schema({
    postToSell : [{
        type : mongoose.Types.ObjectId,
        ref : saleListingModel
    }],
    saleListingResults : [{
        type : mongoose.Types.ObjectId,
        ref : bidModel
    }]
}, {collection : "sellerProfiles"})

module.exports = sellerProfileSchema