const mongoose = require("mongoose")
const saleListingSchema = require("./sale-listing-schema")
const saleListingModel = mongoose.Model("saleListingModel", saleListingSchema)

module.exports = saleListingModel
