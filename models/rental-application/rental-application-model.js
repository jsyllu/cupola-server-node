const mongoose = require("mongoose")
const rentalApplicationSchema = require("./rental-application-schema")
const rentalApplicationModel = mongoose.model("rentalApplicationModel", rentalApplicationSchema)
module.exports = rentalApplicationModel