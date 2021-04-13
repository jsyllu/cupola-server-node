const mongoose = require("mongoose")
const rentalListingSchema = require("./rental-listing-schema")
const rentalListingModel = mongoose.Model("rentalListingModel", rentalListingSchema)

module.exports = rentalListingModel