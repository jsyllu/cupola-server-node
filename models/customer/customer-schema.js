const mongoose = require("mongoose")
const buyerProfileSchema = require("./buyer-profile/buyer-profile-schema")
const lenderProfileSchema = require("./lender-profile/lender-profile-schema")
const sellerProfileSchema = require("./seller-profile/seller-profile-schema")
const tenantProfileSchema = require("./tenant-profile/tenant-profile-schema")
const customerSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    phone : Number,
    email : String,
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    buyerProfile : buyerProfileSchema,
    lenderProfile : lenderProfileSchema,
    sellerProfile : sellerProfileSchema,
    tenantProfile : tenantProfileSchema
}, {collection : "customers"})

module.exports = customerSchema