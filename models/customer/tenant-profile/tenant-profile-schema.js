const mongoose = require("mongoose")
const tenantProfileSchema = mongoose.Schema({
    applications : [{
        type : mongoose.Types.ObjectId,
        ref : "rentalApplicationModel"
    }],
    wishList : [{
        type : mongoose.Types.ObjectId,
        ref : "rentalListingModel"
    }]
}, {collection : "tenantProfiles"})

module.exports = tenantProfileSchema