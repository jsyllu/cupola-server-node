const mongoose = require("mongoose")
const buyerProfileSchema = require("./buyer-profile/buyer-profile")
const lenderProfileSchema = require("./lender-profile/lender-profile-schema")
const sellerProfileSchema = require("./seller-profile/seller-profile-schema")
const tenantProfileSchema = require("./tenant-profile/tenant-profile-schema")
const customerSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    firstName : String,
    lastName : String,
    phone : Number,
    email : String,
    password : {
        type : String,
        required : true
    },
    buyerProfile : buyerProfileSchema,
    lenderProfile : lenderProfileSchema,
    sellerProfile : sellerProfileSchema,
    tenantProfile : tenantProfileSchema
}, {collection : "customers"})

module.exports = customerSchema