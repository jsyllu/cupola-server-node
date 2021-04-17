/**
 * Controller that responsible for requesting data from the service and send it back to the view for catering
 */
const zillowService = require('../services/zillow-service')
const geocodingService = require("../services/geocoding-service")
const rentalListingDao = require("../services/daos/rental-listing-dao")
const saleListingDao = require("../services/daos/sale-listing-dao")
const propertyDao = require("../services/daos/property-dao")
const propertyTypes = require("../models/property/property-type/property-type-enum")

module.exports = (app) => {

    const getPropertiesHelper = (address, status_type, res) => {
        geocodingService.getGeoLocationForAddress(address)
        .then(data => {
            const lat = data["results"][0]["geometry"]["location"]["lat"]
            const lon = data["results"][0]["geometry"]["location"]["lng"]
            // check if db has data for this location
            rentalListingDao.findRentalListingsByLocation(lat, lon, (err, data) => {
                if (err) {
                    res.status(404).send(err.message)
                } else {
                    const numRecords = data.length
                    if (numRecords > 0)
                        res.status(200).json(data)
                    else {
                        // retreieve from the zillowApi and store to db
                        zillowService.getPropertyByFilters({
                            location : address,
                            status_type : status_type
                        })
                        .then(propertyList => {
                            // traverse each element in the propertyList,
                            // and fetch its detail and images from zillow
                            for (p in propertyList.props) {
                                p = propertyList.props[p]
                                setTimeout(() => {
                                    let propertyObj = {}
                                    // fetch its detail
                                    zillowService.getPropertyDetail({
                                        zpid : p.zpid
                                    }).then(pDetail => {
                                        propertyObj["uid"] = mongoose.Types.ObjectId("607895710da0953e57c44f52")
                                        propertyObj["zillowId"] = p.zpid
                                        propertyObj["type"] = pDetail.homeType in propertyTypes ? pDetail.homeType : "CONDO"
                                        propertyObj["size"] = pDetail.livingArea
                                        propertyObj["beds"] = pDetail.bedrooms
                                        propertyObj["baths"] = pDetail.bathrooms
                                        propertyObj["yearBuilt"] = pDetail.yearBuilt
                                        propertyObj["hasBasement"] = pDetail.basement !== undefined || pDetail.basement !== null
                                        propertyObj["hasParking"] = pDetail.parking > 0
                                        propertyObj["hasHeating"] = pDetail.hasHeating
                                        propertyObj["hasAC"] = pDetail.hasCooling === true
    
                                        propertyObj["location"] = {}
                                        propertyObj.location["street"] = pDetail.address.streetAddress
                                        propertyObj.location["city"] = pDetail.address.city
                                        propertyObj.location["state"] = pDetail.address.state
                                        propertyObj.location["country"] = pDetail.address.country
                                        propertyObj.location["zipCode"] = pDetail.address.zipcode
                                        propertyObj.location["longitude"] = pDetail.longitude
                                        propertyObj.location["latitude"] = pDetail.latitude

                                        setTimeout(() => {
                                            // fetch its images
                                            zillowService.getPropertyImages({
                                                zpid : p.zpid
                                            }).then(images => {
                                                propertyObj["gallery"] = images.images
                                                propertyDao.createProperty(propertyObj, (err, data) => {
                                                    if (err) {
                                                        res.status(404).send(err.message)
                                                    } else {
                                                        if (status_type === "ForSale")
                                                            createSaleListingHelper(data, p.price, res)
                                                        else
                                                            createRentalListingHelper(data, p.price, res)
                                                    }
                                                })
                                            })
                                        }, 1500)

                                    }) 
                                }, 1500)
                            }
                        })
                        .catch(err => res.status(404).send(err.message))
                    }
                }
            })
        })
        .catch(err => res.status(404).send(err.message))
    }

    const createSaleListingHelper = (property, price, res) => {
        let listing = {}
        listing["price"] = price
        listing["currency"] = "USD"
        listing["pid"] = property._id

        saleListingDao.createSaleListing(listing, (err, data) => {
            if (err) {
                res.status(404).send(err.message)
            } else
                res.status(200).json(data)
        })
    }

    const createRentalListingHelper = (property, price, res) => {
        let listing = {}
        listing["monthlyRent"] = price
        listing["currency"] = "USD"
        listing["pid"] = property._id

        rentalListingDao.createRentalListing(listing, (err, data) => {
            if (err) {
                res.status(404).send(err.message)
            } else
                res.status(200).json(data)
        })
    }
    
    /**
     * Get list of properties for sale
     */
     app.get("/sale/:location/", (req, res) => {
        // convert address to geo location
        // const uid = mongoose.Types.ObjectId("607895710da0953e57c44f52")
        const address = req.params.location
        getPropertiesHelper(address, "ForSale", res)
        // saleListingDao.findSaleListingsByLocation()
        // if exist, retreieve from db
        // else, retreieve from the zillowApi and store to db
    })    

    /**
     * Get list of properties for rent
     */
    app.get("/rent/:location/", (req, res) => {
        // check if db has data for this location
        // if exist, retreieve from db
        // else, retreieve from the zillowApi and store to db
        const address = req.params.location
        getPropertiesHelper(address, "ForRent", res)
    })
    
    /**
     * Get the property detail for sale
     */
    app.get(["/sale/p/:slid", "/sale/:location/p/:slid"], (req, res) => {
        // check if db has data for this location
        // if exist, retreieve from db
        // else, retreieve from the zillowApi and store to db
    })

    /**
     * Get the property detail for rent
     */
    app.get(["/rent/p/:rlid", "/rent/:location/p/:rlid"], (req, res) => {
        // check if db has data for this location
        // if exist, retreieve from db
        // else, retreieve from the zillowApi and store to db
    })
    
    app.get('/zillow/:zpid', (req, res) => {
        const zpid = req.params.zpid
        zillowService.getPropertyDetail({
            zpid
        }).then(data => res.json(data))
    })
}