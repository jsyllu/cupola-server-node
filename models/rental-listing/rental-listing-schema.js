// https://mongoosejs.com/docs/api.html#schematype_SchemaType-ref
const PropertyModel = require("../property/property-model")
const mongoose = require("mongoose")
const currencies = require("../currency/currency-enum")

const rentalListingSchema = mongoose.Schema({
    pid : {
        type : mongoose.Types.ObjectId,
        ref : PropertyModel,
        require : true
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    updatedAt : {
        type : Date,
        default : new Date()
    },
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