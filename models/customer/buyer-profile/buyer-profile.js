const mongoose = require("mongoose")
const buyerProfileSchema = mongoose.Schema({
    bids : [{
        tpye : mongoose.Types.ObjectId,
        ref : "bidModel"
    }],
    wishList : [{
        type : mongoose.Types.ObjectId,
        ref : "saleListingModel"
    }]
})