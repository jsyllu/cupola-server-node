const mongoose = require("mongoose")
const currencies = require("../../currency/currency-enum")
const propertyTransactionShcema = mongoose.Schema({
    date : Date,
    price : Number,
    currency : {
        type : String,
        enum : currencies
    }
}, {collection : "propertyTransactions"})

module.exports = propertyTransactionShcema