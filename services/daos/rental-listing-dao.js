const rentalListingModel = require("../../models/rental-listing/rental-listing-model")

/**
 * Calculate the haversine distance
 * @param {Array} coords1 - the 1st elem is lat, the 2nd is lon
 * @param {Array} coords2 - the 1st elem is lat, the 2nd is lon
 * @param {Boolean} isMiles 
 * @returns the distance between two coordinates
 */
 function haversineDistance(coords1, coords2, isMiles=false) {
    function toRad(x) {
        return x * Math.PI / 180;
    }
  
    var lon1 = coords1[1];
    var lat1 = coords1[0];
  
    var lon2 = coords2[1];
    var lat2 = coords2[0];
  
    var R = 6371; // km
  
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
  
    if(isMiles) d /= 1.60934;
  
    return d;
}

// https://stackoverflow.com/questions/31357745/find-after-populate-mongoose
/**
 * Find rentalListings based on the location provided (within 320 km)
 * @param {Number} lat 
 * @param {Number} lon 
 */
const findRentalListingsByLocation = (lat, lon, callback) => {
    rentalListingModel
    .find()
    .populate("pid")
    .exec((err, data) => {
        if (err) {
            console.log(`Error from findRentalListingsByLocation : ${err}`)
            callback(err)
        } else {
            if (data.length === 0) {
                callback(null, data)
            }

            listings = data.filter(l => {
                const dist = haversineDistance([l.pid.latitude, l.pid.longitude], [lat, lon])
                // console.log(dist)
                return dist <= 100
            })
            callback(null, listings)
        }
    })
}

/**
 * Find the rentalListingsById
 * @param {Object} rlid 
 * @returns 
 */
const findRentalListingById = (rlid, callback) => {
    return rentalListingModel
    .findById(rlid)
    .populate("pid")
    .exec((err, data) => {
        if (err) {
            console.log(`Error from findRentalListingById : ${err}`)
            callback(err)            
        } else
            callback(null, data)
    })
}


/**
 * Find the rentalListings By Ids
 * @param {Object} slid 
 * @returns 
 */
 const findRentalListingsByIds =  (rlids, callback) => {
    return rentalListingModel
    .find({
        '_id': { $in: rlids}
    })
    .populate("pid")
    .exec((err, data) => {
        if (err) {
            console.log(`Error from findRentalListingsByIds : ${err}`)
            callback(err)            
        } else
            callback(null, data)
    })
}


const createRentalListing = (listing, callback) => {
    return rentalListingModel.create(listing, (err, data) => {
        if (err) {
            console.log(`Error from createRentalListing : ${err}`)
            callback(err)
        } else
            callback(null, data)
                
    })
}


const createManyRentalListings = (listings, callback) => {
    return rentalListingModel.insertMany(listings, (err, data) => {
        if (err) {
            console.log(`Error from createManyRentalListings : ${err}`)
            callback(err)
        } else
            callback(null, data)
                
    })
}

const deleteRentalListingById = (rlid) => {
    return rentalListingModel.deleteOne({"_id" : rlid})
            .then(result => {
                return {
                    "ok" : result.ok,
                    "deletedCount:" : result.deletedCount
                }
            })
}

const updateRentalListingById = (rlid, updatedListing, callback) => {
    return rentalListingModel.findOneAndUpdate({"_id" : rlid}, 
    updatedListing,
    {new : true,
    upsert: false},
    (err, data) => {
        if (err) {
            console.log(`Error from updateRentalListingById : ${err}`)
            callback(err)
        } else
            callback(null, data)        
    })
}

module.exports = {
    findRentalListingsByLocation,
    findRentalListingById,
    createRentalListing,
    deleteRentalListingById,
    updateRentalListingById,
    createManyRentalListings,
    findRentalListingsByIds
}
