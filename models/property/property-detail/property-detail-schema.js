const mongoose = require("mongoose")
const propertyLocationSchema = require("../property-location/property-location-schema")

const propertyDetailSchema = mongoose.Schema({
    location : {
        type : propertyLocationSchema,
        default : undefined
    },
    yearBuilt : Number, // yearBuilt
    gallery : [String], // image urls - another zilllowApi call object.images
    hasBasement : Boolean, // basement !=== undefined || basement !== null
    hasParking : Boolean, // parking (number)
    hasHeating : Boolean, // hasHeating
    hasAC : Boolean, // hasCooling === true
}, {collection : "propertyDetails"})

module.exports = propertyDetailSchema