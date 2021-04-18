const { model } = require("mongoose")
const saleListingModel = require("../../models/sale-listing/sale-listing-model")

/**
 * Calculate the distance between two geo coordinates in km
 * @param {Number} lat1 
 * @param {Number} lon1 
 * @param {Number} lat2 
 * @param {Number} lon2 
 * @returns 
 */
const haversine = (lat1, lon1, lat2, lon2) => {
    earthRadiusKm = 6371

    distLat = (lat1 - lat2) * Math.PI / 180.0
    distLon = (lon1 - lon2) * Math.PI / 180.0

    redianLat1 = lat1 * Math.PI / 180.0
    redianLat2 = lat2 * Math.PI / 180.0

    a = Math.pow(2, Math.sin(distLat / 2)) + Math.pow(2, Math.sin(distLon / 2)) * Math.cos(redianLat1) * Math.cos(redianLat2)
    c = 2 * Math.asin(Math.sqrt(a))
    return c * earthRadiusKm
}

const findSaleListingsByLocation = (lat, lon, callback) => {
    saleListingModel
    .find()
    .populate("pid")
    .exec((err, data) => {
        if (err) {
            console.log(`Error from findSaleListingsByLocation : ${err}`)
            callback(err)
        } else {
            listings = data.filter(l => {
                const dist = haversine(l.pid.location.latitude, l.pid.location.longitude, lat, lon)
                console.log(dist)
                return dist <= 320
            })
            callback(null, listings)
        }
    })
}

/**
 * Find the saleListingsById
 * @param {Object} slid 
 * @returns 
 */
const findSaleListingById = (slid, callback) => {
    saleListingModel
    .findById(slid)
    .populate("pid")
    .exec((err, data) => {
        if (err) {
            console.log(`Error from findSaleListingById : ${err}`)
            callback(err)            
        } else
            callback(null, data)
    })
}

const createSaleListing = (listing, callback) => {
    saleListingModel.create(listing, (err, data) => {
        if (err) {
            console.log(`Error from createSaleListing : ${err}`)
            callback(err)
        } else
            callback(null, data)
                
    })
}

const deleteSaleListingById = (slid) => {
    return rentalListingModel.deleteOne({"_id" : slid})
            .then(result => {
                return {
                    "ok" : result.ok,
                    "deletedCount:" : result.deletedCount
                }
            })
}

const updateSaleListingById = (slid, updatedListing, callback) => {
    saleListingModel.findByIdAndUpdate({"_id" : slid}, updatedListing)
    .exec((err, data) => {
        if (err) {
            console.log(`Error from updateSaleListingById : ${err}`)
            callback(err)
        } else
            callback(null, data)        
    })
}

module.exports = {
    findSaleListingsByLocation,
    findSaleListingById,
    createSaleListing,
    deleteSaleListingById,
    updateSaleListingById
}