const mongoose = require("mongoose")
const sellerProfileSchema = mongoose.Schema({
    postToSell : [{
        type : mongoose.Types.ObjectId,
        ref : "saleListingModel"
    }],
    saleListingResults : [{
        type : mongoose.Types.ObjectId,
        ref : "bidModel"
    }]
}, {collection : "sellerProfiles"})

module.exports = sellerProfileSchema