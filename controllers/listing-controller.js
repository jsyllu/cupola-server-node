/**
 * Controller that responsible for requesting data from the service and send it back to the view for catering
 */
const zillowService = require('../services/zillow-service')

module.exports = (app) => {

    /**
     * Get list of properties for sale
     */
    app.get("/sale/:location/", (req, res) => {
        // check if db has data for this location
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