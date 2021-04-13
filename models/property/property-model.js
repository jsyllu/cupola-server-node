const mongoose = require("mongoose")
const propertySchema = require("./property-schema")
const propertyModel = mongoose.model("PropertyModel", propertySchema)

module.exports = propertyModel