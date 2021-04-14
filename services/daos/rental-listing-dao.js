const propertyModel = require("../../models/property/property-model")
const rentalListingModel = require("../../models/rental-listing/rental-listing-model")

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

// https://stackoverflow.com/questions/31357745/find-after-populate-mongoose
/**
 * Find rentalListings based on the location provided (within 320 km)
 * @param {Number} lat 
 * @param {Number} lon 
 */
const findRentalListingsByLocation = (lat, lon) => {
    return rentalListingModel
    .find()
    .populate("pid")
    .exec()
    .then(listings => {
        listings = listings.filter(l => {
            const dist = haversine(l.pid.location.latitude, l.pid.location.longitude, lat, lon)
            console.log(dist)
            return dist <= 320
        })
        return listings
    })
}

/**
 * Find the rentalListingsById
 * @param {Object} rlid 
 * @returns 
 */
const findRentalListingById = (rlid) => {
    return rentalListingModel
    .findById(rlid)
    .populate("pid")
    .exec()
    .then(l => l)
}

const createRentalListing = (listing) => {
    return rentalListingModel.create(listing)
}

const deleteRentalListingById = (rlid) => {
    return rentalListingModel.deleteOne({"_id" : rlid})
}

const updateRentalListingById = (rlid, updatedListing) => {
    return rentalListingModel.findByIdAndUpdate({"_id" : rlid}, updatedListing)
}

module.exports = {
    findRentalListingsByLocation,
    findRentalListingById,
    createRentalListing,
    deleteRentalListingById,
    updateRentalListingById
}
