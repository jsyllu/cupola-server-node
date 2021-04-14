const mongoose = require("mongoose")
const rentalListingSchema = require("./rental-listing-schema")
const rentalListingModel = mongoose.model("rentalListingModel", rentalListingSchema)

module.exports = rentalListingModel