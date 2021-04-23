/**
 * Controller that responsible for requesting data from the service and send it back to the view for catering
 */
const zillowService = require('../services/zillow-service')
const geocodingService = require("../services/geocoding-service")
const rentalListingDao = require("../services/daos/rental-listing-dao")
const saleListingDao = require("../services/daos/sale-listing-dao")
const propertyDao = require("../services/daos/property-dao")
const propertyTypes = require("../models/property/property-type/property-type-enum")
const customerService = require("../services/customer-service")

module.exports = (app) => {

    /**
     * A helper function to get rental listings close to a specific location
     * @param {String} address 
     * @param {Response} res 
     */
    const getRentalPropertiesHelper = (address, res) => {
        geocodingService.getGeoLocationForAddress(address)
        .then(getLoc => {
            const lat = getLoc["results"][0]["geometry"]["location"]["lat"]
            const lon = getLoc["results"][0]["geometry"]["location"]["lng"]
            // check if db has data for this location
            rentalListingDao.findRentalListingsByLocation(lat, lon, (err, rentalListings) => {
                if (err) {
                    return res.status(404).send(err.message)
                } else {
                    const numRecords = rentalListings.length
                    if (numRecords > 0)
                        return  res.status(200).json(rentalListings)
                    else {
                        // retreieve from the zillowApi and store to db
                        zillowService.getPropertyByFilters({
                            location : address,
                            status_type : "ForRent"
                        })
                        .then(propertyList => {
                            // traverse each element in the propertyList,
                            // and fetch its detail and images from zillow
                            properties = []
                            for (idx in propertyList.props) {                         
                                const pzillow = propertyList.props[idx] // save this property to db
                                if (pzillow.zpid.includes("--"))
                                    continue
                                let property = {}
                                property["zillowId"] = pzillow.zpid
                                property["size"] = pzillow.livingArea
                                property["beds"] = pzillow.bedrooms
                                property["baths"] = pzillow.bathrooms
                                property["type"] = propertyTypes.includes(pzillow.propertyType) ? pzillow.propertyType : "CONDO"
                                property["price"] = pzillow.price
                                property["longitude"] = pzillow.longitude
                                property["latitude"] = pzillow.latitude
                                property["address"] = pzillow.address
                                properties.push(property)
                            }

                            propertyDao.createManyProperties(properties, (err, data) => {
                                if (err)
                                    return res.status(404).send(err.message)
                                else {
                                    return createManyRentalListingsHelper(data, res)
                                }
                            })
                        })
                        .catch(err => res.status(404).send(err.message))
                    }
                }
            })
        })
        .catch(err => res.status(404).send(err.message))
    }

    /**
     * A helper function to get sale listings close to a specific location
     * @param {String} address 
     * @param {Response} res 
     */
    const getSalePropertiesHelper = (address, res) => {
        geocodingService.getGeoLocationForAddress(address)
        .then(getLoc => {
            // console.log(getLoc)
            const lat = getLoc["results"][0]["geometry"]["location"]["lat"]
            const lon = getLoc["results"][0]["geometry"]["location"]["lng"]
            // check if db has data for this location
            saleListingDao.findSaleListingsByLocation(lat, lon, (err, rentalListings) => {
                if (err) {
                    return res.status(404).send(err.message)
                } else {
                    const numRecords = rentalListings.length
                    if (numRecords > 0)
                        return res.status(200).json(rentalListings)
                    else {
                        // retreieve from the zillowApi and store to db
                        zillowService.getPropertyByFilters({
                            location : address,
                            status_type : "ForSale"
                        })
                        .then(propertyList => {
                            // traverse each element in the propertyList,
                            // and fetch its detail and images from zillow
                            properties = []
                            for (idx in propertyList.props) {
                                const pzillow = propertyList.props[idx] // save this property to db
                                if (pzillow.zpid.includes("--"))
                                    continue
                                let property = {}
                                property["zillowId"] = pzillow.zpid
                                property["size"] = pzillow.livingArea
                                property["beds"] = pzillow.bedrooms
                                property["baths"] = pzillow.bathrooms
                                property["type"] =  propertyTypes.includes(pzillow.propertyType) ? pzillow.propertyType : "CONDO"
                                property["price"] = pzillow.price
                                property["longitude"] = pzillow.longitude
                                property["latitude"] = pzillow.latitude
                                property["address"] = pzillow.address
                                properties.push(property)
                            }

                            propertyDao.createManyProperties(properties, (err, data) => {
                                if (err)
                                    return res.status(404).send(err.message)
                                else {
                                    return createManySaleListingsHelper(data, res)
                                }
                            })
                        })
                        .catch(err => res.status(404).send(err.message))
                    }
                }
            })
        })
        .catch(err => res.status(404).send(err.message))
    }    

    /**
     * A helper method to add many properties to sale listings
     * @param {Array} properties 
     * @param {Response} res 
     */
    const createManySaleListingsHelper =  (properties, res) => {
        let listings = []
        for (idx in properties) {
            listings.push({
                price : properties[idx].price,
                currency : "USD",
                pid : properties[idx]._id,
            })
        }
        // console.log(properties)
        saleListingDao.createManySaleListings(listings, (err, data) => {
            if (err) {
                return res.status(404).send(err.message)
            } else {
                slids = []
                for (idx in data) {
                    slids.push(data[idx]._doc._id)
                }
                saleListingDao.findSaleListingsByIds(slids, (err, data) => {
                    if (err)
                        return res.status(404).send(err.message)
                    else
                        return res.status(200).json(data)
                }) 
            }
        })
    }

    /**
     * A helper method to add many properties to rental listings
     * @param {Array} properties 
     * @param {Response} res 
     */    
    const createManyRentalListingsHelper = (properties, res) => {
        let listings = [] // 0 1 2
        for (idx in properties) {
            listings.push({
                price : properties[idx].price,
                currency : "USD",
                pid : properties[idx]._id,
            })
        }

        rentalListingDao.createManyRentalListings(listings, (err, data) => {
            if (err) {
                return res.status(404).send(err.message)
            } else {
                listings = []
                for (idx in data) {
                    listings.push({
                        ...data[idx]._doc,
                        pid : properties[idx]
                    })
                }

                rlids = []
                for (idx in data) {
                    rlids.push(data[idx]._doc._id)
                }
                rentalListingDao.findRentalListingsByIds(rlids, (err, data) => {
                    if (err)
                        return res.status(404).send(err.message)
                    else
                        return res.status(200).json(data)
                }) 
            }
        })
    }     

    /**
     * A helepr method to add a property to sale listing
     * @param {Object} property 
     * @param {Number} price 
     * @param {Response} res 
     */
    const createSaleListingHelper = (property, price, res) => {
        let listing = {}
        listing["price"] = price
        listing["currency"] = "USD"
        listing["pid"] = property._id

        saleListingDao.createSaleListing(listing, (err, data) => {
            if (err) {
                return res.status(404).send(err.message)
            } else
                return res.status(200).json(data)
        })
    }

    /**
     * A helepr method to add a property to rental listing
     * @param {Object} property 
     * @param {Number} price 
     * @param {Response} res 
     */    
    const createRentalListingHelper = (property, price, res) => {
        let listing = {}
        listing["monthlyRent"] = price
        listing["currency"] = "USD"
        listing["pid"] = property._id

        rentalListingDao.createRentalListing(listing, (err, data) => {
            if (err)
                return res.status(404).send(err.message)
            else
                return res.status(200).json(data)
        })
    }

    /**
     * A helper function to find a listing by id
     * @param {ObjectId} ids 
     * @param {Response} res 
     */
    const findRentalListingsHelper = (ids, res) => {
        rentalListingDao.findRentalListingsByIds(ids, (err, data) => {
            if (err)
                return res.status(404).send(err.message)
            else
                return res.status(200).json(data)
        })
    }

    /**
     * A helper function to find a listing by id
     * @param {ObjectId} ids 
     * @param {Response} res 
     */    
    const findSaleListingsHelper = (ids, res) => {
        saleListingDao.findSaleListingsByIds(ids, (err, data) => {
            if (err)
                return res.status(404).send(err.message)
            else
                return res.status(200).json(data)
        })
    }

    /**
     * Add a rentalListing to wishList
     */
    app.post("/profile/wishlist/rent", (req, res) => {
        const ids = JSON.parse(JSON.stringify(req.body))
        findRentalListingsHelper(ids, res)
    })

    /**
     * Add a saleListing to wishList
     */
    app.post("/profile/wishlist/sale", (req, res) => {
        const ids = JSON.parse(JSON.stringify(req.body))
        findSaleListingsHelper(ids, res)
    })
    
    /**
     * get detals of list of rentalListing by Ids
     */
    app.post("/profile/post/rent", (req, res) => {
        const ids = JSON.parse(JSON.stringify(req.body))
        findRentalListingsHelper(ids, res)
    })

    /**
     * get detals of list of saleListing by Ids
     */    
    app.post("/profile/post/sale", (req, res) => {
        const ids = JSON.parse(JSON.stringify(req.body))
        findSaleListingsHelper(ids, res)
    })

    /**
     * Get list of properties for sale
     */
     app.get("/sale/:location/", (req, res) => {
        // convert address to geo location
        // const uid = mongoose.Types.ObjectId("607895710da0953e57c44f52")
        const address = req.params.location
        // console.log(address)
        getSalePropertiesHelper(address, res)
    })    

    /**
     * Get list of properties for rent
     */
    app.get("/rent/:location/", (req, res) => {
        // check if db has data for this location
        // if exist, retreieve from db
        // else, retreieve from the zillowApi and store to db
        const address = req.params.location
        getRentalPropertiesHelper(address, res)
    })
    
    /**
     * Get the property detail for sale
     */
    app.get("/sale/p/:slid", (req, res) => {
        // check if db has data for this location
        // if exist, retreieve from db
        // else, retreieve from the zillowApi and store to db
        const slid = req.params.slid
        saleListingDao.findSaleListingById(slid, (err, data) => {
            if (err)
                return res.status(404).send(err.message)
            else {
                if (data === null) {
                    return res.status(200).json(data) 
                }

                if (data.pid.details !== undefined) {
                    // console.log(data.pid.details)
                    return res.status(200).send(data)
                } else {
                    if (data.pid.zillowId === undefined) {
                        // console.log("What?")
                        return res.status(200).send(data)
                    } else {
                        zillowService.getPropertyDetail({"zpid" : data.pid.zillowId})
                        .then(zDetail => {
                            // map the zillow data to propertyDetail model
                            details = {}
                            details["yearBuilt"] = zDetail.yearBuilt
                            details["hasBasement"] = zDetail.basement !== null
                            details["hasParking"] = zDetail.parking > 0
                            details["hasHeating"] = zDetail.hasHeating
                            details["hasAC"] = zDetail.hasCooling === true
                            details["location"] = {}
                            details["location"]["street"] = zDetail.address.streetAddress
                            details["location"]["city"] = zDetail.address.city
                            details["location"]["state"] = zDetail.address.state
                            details["location"]["zipCode"] = zDetail.address.zipcode
                            details["location"]["longitude"] = zDetail.longitude
                            details["location"]["latitude"] = zDetail.latitude

                            setTimeout((details, zDetail, listting) => {
                                zillowService.getPropertyImages({zpid : zDetail.zpid})
                                .then(imgs => {
                                    details["gallery"] = imgs.images
                                    listting.pid.details = details
                                    propertyDao.updatePropertyById(listting.pid._id, listting.pid, (err, response) => {
                                        if (err)
                                            return res.status(404).send(err.message)
                                        else
                                            return res.status(200).json(listting)
                                    })
                                })
                                .catch(err => res.status(404).send(err))
                            }, 1000, details, zDetail, data);
                        })
                        .catch(err => res.status(404).send(err.message))
                    }
                }
            }
        })
    })

    /**
     * Get the property detail for rent
     */
    app.get("/rent/p/:rlid", (req, res) => {
        // check if db has data for this location
        // if exist, retreieve from db
        // else, retreieve from the zillowApi and store to db
        const rlid = req.params.rlid
        rentalListingDao.findRentalListingById(rlid, (err, listing) => {
            if (err)
                return res.status(404).send(err.message)
            else {
                if (listing === null) {
                    return res.status(200).json(listing) 
                }
                // console.log(listing.pid.details)
                if (listing.pid.details !== undefined) {
                    console.log("yoyoyoy")
                    return res.status(200).send(listing)
                } else {
                    if (listing.pid.zillowId === undefined) {
                        return res.status(200).send(listing)
                    } else {
                        zillowService.getPropertyDetail({"zpid" : listing.pid.zillowId})
                        .then(zDetail => {
                            // map the zillow data to propertyDetail model
                            details = {}
                            details["yearBuilt"] = zDetail.yearBuilt
                            details["hasBasement"] = zDetail.basement !== null
                            details["hasParking"] = zDetail.parking > 0
                            details["hasHeating"] = zDetail.hasHeating
                            details["hasAC"] = zDetail.hasCooling === true
                            details["location"] = {}
                            details["location"]["street"] = zDetail.address.streetAddress
                            details["location"]["city"] = zDetail.address.city
                            details["location"]["state"] = zDetail.address.state
                            details["location"]["zipCode"] = zDetail.address.zipcode
                            details["location"]["longitude"] = zDetail.longitude
                            details["location"]["latitude"] = zDetail.latitude

                            setTimeout((details, zDetail, listing) => {
                                zillowService.getPropertyImages({zpid : zDetail.zpid})
                                .then(imgs => {
                                    details["gallery"] = imgs.images
                                    listing["pid"]["details"] = details
                                    propertyDao.updatePropertyById(listing.pid._id, listing.pid, (err, response) => {
                                        if (err)
                                            return res.status(404).send(err.message)
                                        else {
                                            // console.log(response)
                                            return res.status(200).json(listing)
                                        }
                                            
                                    })
                                })
                                .catch(err => res.status(404).send(err.message))
                            }, 1000, details, zDetail, listing);
                        })
                        .catch(err => res.status(404).send(err.message))
                    }
                }
            }
        })        
    })

    /**
     * Add new property
     */
    app.post("/property/new", (req, res) => {
        const p = JSON.parse(JSON.stringify(req.body))
        propertyDao.createProperty(p, (err, data) => {
            if (err)
                return res.status(404).send(err.message)
            else 
                return res.status(200).json(data)
        })
    })

    /**
     * Add new rental Listing
     */
    app.post("/rent/new", (req, res) => {
        const listing = JSON.parse(JSON.stringify(req.body))
        const pid = listing["pid"]
        rentalListingDao.createRentalListing(listing, (err, newListing) => {
            if (err)
                return res.status(404).send(err.message)
            else {
                propertyDao.findPropertyById(pid, (err, property) => {
                    if (err)
                        return res.status(404).send(err.message)
                    else {
                        const uid = property["uid"]
                        customerService.findCustomerById(uid, (err, customer) => {
                            if (err)
                                return res.stauts(404).send(err.message)
                            else {
                                if (customer["lenderProfile"] === undefined || customer["lenderProfile"] === null) {
                                    customer["lenderProfile"] = {}
                                    customer["lenderProfile"]["postToLend"] = []
                                    customer["lenderProfile"]["rentalListingResults"] = []
                                }
                                
                                customer["lenderProfile"]["postToLend"].push(newListing._id)
                                customerService.updateCustomer(customer, null, (err, updatedCustomer) => {
                                    if (err)
                                        return res.stauts(404).send(err.message)
                                    else 
                                        return res.status(200).json(newListing)
                                })
                            }
                        })
                    }
                })
            }
                
        })        
    })

    /**
     * Add new saleListing
     */
    app.post("/sale/new", (req, res) => {
        const listing = JSON.parse(JSON.stringify(req.body))
        const pid = listing["pid"]
        saleListingDao.createSaleListing(listing, (err, newListing) => {
            if (err)
                return res.status(404).send(err.message)
            else {
                propertyDao.findPropertyById(pid, (err, property) => {
                    if (err)
                        return res.status(404).send(err.message)
                    else {
                        const uid = property["uid"]
                        customerService.findCustomerById(uid, (err, customer) => {
                            if (err)
                                return res.stauts(404).send(err.message)
                            else {
                                if (customer["sellerProfile"] === undefined || customer["sellerProfile"] === null) {
                                    customer["sellerProfile"] = {}
                                    customer["sellerProfile"]["postToSell"] = []
                                    customer["sellerProfile"]["saleListingResults"] = []
                                }
                                customer["sellerProfile"]["postToSell"].push(newListing._id)
                                customerService.updateCustomer(customer, null, (err, updatedCustomer) => {
                                    if (err)
                                        return res.stauts(404).send(err.message)
                                    else 
                                        return res.status(200).json(newListing)
                                })
                            }
                        })
                    }
                })
            }
                
        })        
    })

    /**
     * Delete a rentalListing
     */
    app.delete("/rent/:rlid", (req, res) => {
        const rlid = req.params.rlid
        // get the detail for this rentalListing
        rentalListingDao.findRentalListingById(rlid, (err, rentalListing) => {
            if (err)
                return res.status(404).send(err.message)
            else {
                if (rentalListing === undefined || rentalListing === null)
                    return res.status(404).send("RentalListing not found")
                // get the uid
                const uid = rentalListing.pid.uid
                customerService.findCustomerById(uid, (err, data) => {

                })
            }
        })
    })

    /**
     * Delete a saleListing
     */
    app.delete("sale/p/:slid", (req, res) => {
        const user = req.session['profile']
        const id = req.params.slid
        console.log(user)

        if (user === undefined || user === null)
            return res.status(404).send("Please login")

        saleListingDao.findSaleListingById(id, (err, listing) => {
            if (err)
                return res.stauts(404).send(err.message)
            
            if (listing === undefined || listing === null)
                return res.stauts(404).send("Could not find the listing")
            
            if (listing.pid === undefined || listing.pid === null)
                return res.stauts(404).send("Could not find the property")

            const uid = String(listing.pid.uid)
            if (uid !== String(user._uid))
                return res.stauts(404).send("User Id not match")
            
            const pid = listing.pid._id
            customerService.findCustomerById(uid, (err, customer) => {
                if (err)
                    return res.status(404).send(err.message)
                
                    try {
                        const postToSell = customer.sellerProfile.postToSell.filter(l => String(l) !== id)
                        customer.sellerProfile.postToSell = postToSell
                        
                        customerService.updateCustomer(customer, (err, updatedCustomer) => {
                            if (err)
                                return res.stauts(404).send(err.message)
                            
                            propertyDao.deletePropertyById(pid)
                            .then(val => {
                                saleListingDao.deleteSaleListingById(id)
                                .then(val => res.status(200).json(updatedCustomer))
                                .catch(e => res.status(404).send(e.message))
                            })
                            .catch(e => res.status(404).send(e.message))
                        })
                    } catch (e) {
                        return res.status(404).send(e.message)
                    }
            })
        })
    })

    /**
     * Delete a rentalListing
     */
     app.delete("rent/p/:rlid", (req, res) => {
        const user = req.session['profile']
        const id = req.params.rlid
        console.log(user)
    
        if (user === undefined || user === null)
            return res.status(404).send("Please login")
        
        rentalListingDao.findRentalListingById(id, (err, listing) => {
            if (err)
                return res.stauts(404).send(err.message)
            
            if (listing === undefined || listing === null)
                return res.stauts(404).send("Could not find the listing")
            
            if (listing.pid === undefined || listing.pid === null)
                return res.stauts(404).send("Could not find the property")

            const uid = String(listing.pid.uid)
            if (uid !== String(user._uid))
                return res.stauts(404).send("User Id not match")
            
            const pid = listing.pid._id
            customerService.findCustomerById(uid, (err, customer) => {
                if (err)
                    return res.status(404).send(err.message)
                
                    try {
                        const postToLend = customer.lenderProfile.postToLend.filter(l => String(l) !== id)
                        customer.lenderProfile.postToLend = postToLend
                        
                        customerService.updateCustomer(customer, (err, updatedCustomer) => {
                            if (err)
                                return res.stauts(404).send(err.message)
                            
                            propertyDao.deletePropertyById(pid)
                            .then(val => {
                                rentalListingDao.deleteRentalListingById(id)
                                .then(val => res.status(200).json(updatedCustomer))
                                .catch(e => res.status(404).send(e.message))
                            })
                            .catch(e => res.status(404).send(e.message))
                        })
                    } catch (e) {
                        return res.status(404).send(e.message)
                    }
            })
        })
    })    

    /**
     * Test zillow zpi
     */
    app.get('/zillow/:zpid', (req, res) => {
        const zpid = req.params.zpid
        zillowService.getPropertyDetail({
            zpid
        }).then(data => res.json(data))
    })    
}