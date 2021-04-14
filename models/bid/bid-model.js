const mongoose = require("mongoose")
const bidSchema = require("./bid-schema")
const bidModel = mongoose.model("bidModel", bidSchema)
module.exports = bidModel