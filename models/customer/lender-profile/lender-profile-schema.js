const mongoose = require("mongoose")
const rentalListingModel = require("../../rental-listing/rental-listing-model")
const rentalApplicationModel = require("../../rental-application/rental-application-model")
const lenderProfileSchema = mongoose.Schema({
    postToLend : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : rentalListingModel
    }],
    rentalListingResults : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : rentalApplicationModel
    }]
}, {collection : "lenderProfiles"})

module.exports = lenderProfileSchema