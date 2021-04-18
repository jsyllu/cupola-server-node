const mongoose = require("mongoose")
const rentalApplicationModel = require("../../rental-application/rental-application-model")
const rentalListingModel = require("../../rental-listing/rental-listing-model")
const tenantProfileSchema = mongoose.Schema({
    applications : [{
        type : String
        // ref : rentalApplicationModel
    }],
    wishList : [{
        type : String
        // ref : rentalListingModel
    }]
}, {collection : "tenantProfiles"})

module.exports = tenantProfileSchema