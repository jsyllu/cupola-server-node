const mongoose = require("mongoose")
const propertyLocationSchema = mongoose.Schema({
    street : String,
    city : String,
    state : String,
    country : String,
    zipCode : Number,
    longitude : Number,
    latitude : Number
}, {collection : "propertyLocations"})

module.exports = propertyLocationSchema