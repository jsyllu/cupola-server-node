const mongoose = require("mongoose")
const propertySchema = require("./property-schema")
const propertyModel = mongoose.model("propertyModel", propertySchema)

module.exports = propertyModel