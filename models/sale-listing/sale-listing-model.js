const mongoose = require("mongoose")
const saleListingSchema = require("./sale-listing-schema")
const saleListingModel = mongoose.model("saleListingModel", saleListingSchema)

module.exports = saleListingModel
