const mongoose = require("mongoose")
const rentalApplicationModel = require("../../rental-application/rental-application-model")
const rentalListingModel = require("../../rental-listing/rental-listing-model")
const tenantProfileSchema = mongoose.Schema({
    applications : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : rentalApplicationModel
    }],
    wishList : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : rentalListingModel
    }]
}, {collection : "tenantProfiles"})

module.exports = tenantProfileSchema