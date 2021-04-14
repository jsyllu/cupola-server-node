const mongoose = require("mongoose")
const customerSchema = require("./customer-schema")
const customerModel = mongoose.model("customerModel", customerSchema)
module.exports = customerModel