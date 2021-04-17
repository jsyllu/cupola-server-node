/**
 * Controller that responsible for requesting data from the service and send it back to the view for catering
 */
const zillowService = require('../services/zillow-service')
const geocodingService = require("../services/geocoding-service")
const rentalListingDao = require("../services/daos/rental-listing-dao")
const saleListingDao = require("../services/daos/sale-listing-dao")
const { lastIndexOf } = require('../models/currency/currency-enum')

module.exports = (app) => {

    /**
     * Get list of properties for sale
     */
    app.get("/sale/:location/", (req, res) => {
        // convert address to geo location
        const address = req.params.location
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
                            location : address
                        })
                        .then(data => {
                            // map the data to Property and Listing Schema
                            res.status(200).json(data)
                        })
                        .catch(err => res.status(404).send(err.message))
                    }
                }
            })
        })
        .catch(err => res.status(404).send(err.message))

        
        // saleListingDao.findSaleListingsByLocation()
        // if exist, retreieve from db
        // else, retreieve from the zillowApi and store to db
    })

    app.get('/zillow/:zpid', (req, res) => {
        const zpid = req.params.zpid
        zillowService.getPropertyDetail({
            zpid
        }).then(data => res.json(data))
    })

    /**
     * Get list of properties for rent
     */
    app.get("/rent/:location/", (req, res) => {
        // check if db has data for this location
        // if exist, retreieve from db
        // else, retreieve from the zillowApi and store to db
        const address = req.params.location
        zillowService.getPropertyByFilters({
            location : address,
            status_type : "ForRent"
        })
        .then(data => {
            // map the data to Property and Listing Schema
            res.status(200).json(data)
        })
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
}