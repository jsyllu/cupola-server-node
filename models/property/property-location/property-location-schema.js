const mongoose = require("mongoose")
const propertyLocationSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    street : String, // address.streetAddress
    city : String, // address.city
    state : String, // address.state
    country : {
        type : String,
        default : "USA"
    }, // country
    zipCode : Number, // address.zipcode
    longitude : Number, // longitude
    latitude : Number // latitude
}, {collection : "propertyLocations"})

module.exports = propertyLocationSchema