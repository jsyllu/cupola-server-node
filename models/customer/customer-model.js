const mongoose = require("mongoose")
const customerSchema = require("./customer-schema")
const customerModel = mongoose.Model("customerModel", customerSchema)
module.exports = customerModel