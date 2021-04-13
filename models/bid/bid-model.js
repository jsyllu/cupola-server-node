const mongoose = require("mongoose")
const bidSchema = require("./bid-schema")
const bidModel = mongoose.Model("bidModel", bidSchema)
module.exports = bidModel