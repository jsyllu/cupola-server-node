const mongoose = require("mongoose")
const saleListingModel = require("../../sale-listing/sale-listing-model")
const bidModel = require("../../bid/bid-model")
const sellerProfileSchema = mongoose.Schema({
    postToSell : [{
        type : String
        // ref : saleListingModel
    }],
    saleListingResults : [{
        type : String
        // ref : bidModel
    }]
}, {collection : "sellerProfiles"})

module.exports = sellerProfileSchema