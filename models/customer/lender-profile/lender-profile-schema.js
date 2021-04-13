const mongoose = require("mongoose")
const lenderProfileSchema = mongoose.Schema({
    postToLend : [{
        type : mongoose.Types.ObjectId,
        ref : "rentalListingModel"
    }],
    rentalListingResults : [{
        type : mongoose.Types.ObjectId,
        ref : "rentalApplicationModel"
    }]
}, {collection : "lenderProfiles"})

module.exports = lenderProfileSchema