const mongoose = require("mongoose")
const rentalApplicationSchema = require("./rental-application-schema")
const rentalApplicationModel = mongoose.Model("rentalApplicationModel", rentalApplicationSchema)
module.exports = rentalApplicationModel