const mongoose = require("mongoose")
const rentalListingModel = require("../../rental-listing/rental-listing-model")
const rentalApplicationModel = require("../../rental-application/rental-application-model")
const lenderProfileSchema = mongoose.Schema({
    postToLend : [{
        type : String
        // ref : rentalListingModel
    }],
    rentalListingResults : [{
        type : String
        // ref : rentalApplicationModel
    }]
}, {collection : "lenderProfiles"})

module.exports = lenderProfileSchema