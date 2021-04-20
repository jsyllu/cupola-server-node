const { model } = require("mongoose")
const saleListingModel = require("../../models/sale-listing/sale-listing-model")

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

const findSaleListingsByLocation = (lat, lon, callback) => {
    return saleListingModel
    .find()
    .populate("pid")
    .exec((err, data) => {
        if (err) {
            console.log(`Error from findSaleListingsByLocation : ${err}`)
            callback(err)
        } else {
            // console.log(data)
            if (data.length === 0) {
                callback(null, data)
            }

            listings = data.filter(l => {
                const dist = haversineDistance([l.pid.latitude, l.pid.longitude], [lat, lon])
                return dist <= 300
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
const findSaleListingById =  (slid, callback) => {
    return saleListingModel
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


/**
 * Find the saleListings By Ids
 * @param {Object} slid 
 * @returns 
 */
 const findSaleListingsByIds =  (slids, callback) => {
    return saleListingModel
    .find({
        '_id': { $in: slids}
    })
    .populate("pid")
    .exec((err, data) => {
        if (err) {
            console.log(`Error from findSaleListingsByIds : ${err}`)
            callback(err)            
        } else
            callback(null, data)
    })
}

const createSaleListing = (listing, callback) => {
    return saleListingModel.create(listing, (err, data) => {
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
    return saleListingModel.findOneAndUpdate(
        {"_id" : slid}, 
        updatedListing,
        {new : true,
        upsert : false},
        (err, data) => {
            if (err) {
                console.log(`Error from updateSaleListingById : ${err}`)
                callback(err)
            } else
                callback(null, data)        
        })
}


const createManySaleListings = (listings, callback) => {
    return saleListingModel.insertMany(listings, (err, data) => {
        if (err) {
            console.log(`Error from createManySaleListings : ${err}`)
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
    updateSaleListingById,
    createManySaleListings,
    findSaleListingsByIds
}