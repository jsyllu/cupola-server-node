const mongoose = require("mongoose")
const currencies = require("../currency/currency-enum")

const rentalListingSchema = mongoose.Schema({
    pid : {
        type : mongoose.Types.ObjectId,
        ref : "PropertyModel",
        require : true
    },
    createdAt : Date,
    updatedAt : Date,
    monthlyRent : Number,
    currency : {
        type : String,
        enum : currencies
    },
    securityDeposit : Number,
    securityDeposityRefundable : Boolean,
    otherDeposit : Number,
    otherDepositRefundable : Boolean,
    availableFrom : Date,
    leaseLength : Number,
    maxOccupancy: Number,
    animalFriendly : Boolean,
    restrictions : String,
    lendingProof : String,
    rightToLend : Boolean
}, {collection : "rentalListings"})

module.exports = rentalListingSchema