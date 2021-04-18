const customerService = require("../services/customer-service")
const mongoose = require('mongoose');
/**
 * Controller for managing customer information
 * customer data UML
 *  - UID: ObjectId
    - firstName: String
    - lastName: String
    - phone: Integer
    - email: String
    - isAdmin : Boolean,
    - password : String
    - buyerProfile: BuyerProfile
    - tenantProfile: TenantProfile
    - sellerProfile: SellerProfile
    - lenderProfile: LenderProfile
 * @param {*} app - Express Application
 */
module.exports = (app) => {

    /**
    * URL to create a new customer, registration information encoded in the body
    * body pattern
    */
    app.post("/register", (req, res) => {
        // extract information from the request body
        const data = JSON.parse(JSON.stringify(req.body))
        // save the data to the database
        
        customerService.createCustomer(data, (err, data) => {
            if (!err)
                res.status(200).send(data)
            else 
                res.status(404).send(err.message)
        })
    })
    /**
    * Update customer information, updated information encoded in the body
    */
    app.put("/profile/:uid", (req, res) => {
        // extract information from the request body
        const uid = mongoose.Types.ObjectId(req.params.uid)
        const data = JSON.parse(JSON.stringify(req.body))
        data["_id"] = uid
        // save the data to the database
        customerService.updateCustomer(data, (err, data) => {
            if (!err)
                res.status(200).send(data)
            else 
                res.status(404).send(err.message)            
        })
    })

    /**
    * Get the customer's detail information
    */
    app.get("/profile/:uid", (req, res) => {
         // retrieve the data from db using uid as the unique identifier
        const uid = mongoose.Types.ObjectId(req.params.uid)
        const data = customerService.findCustomerById(uid)
        data.then(d => res.json(d))
    })

    /**
    * Get all customers info (only for admin)
    */
    app.get("/admin/profiles/:uid", (req, res) => {
        // retrieve the data from db using uid as the unique identifier
       const uid = mongoose.Types.ObjectId(req.params.uid)
       const data = customerService.findCustomerById(uid)
       data.then(d => {
            if (d !== null && d["isAdmin"] === true) {
                customerService.findCustomers()
                .then(d => res.status(200).json(d))
            } else
                res.status(404).send("Unauthorized Access")
        })
    })

    /**
     * Delete an customer based on its uid
     */
    app.delete("/profile/:uid", (req, res) => {
        const uid = mongoose.Types.ObjectId(req.params.uid)
        customerService.deleteCustomer(uid)
        .then(result => res.json({
            "ok" : result.ok,
            "deletedCount:" : result.deletedCount
        }))
    })

    /**
     * Delete the logged-in session
     */
    app.get('/logout', (req, res) => {
        // TODO: delete the logged-in user session
        res.status(200).json('logged out')
    })

    /**
     * Create a logged-in user session
     */
    app.post('/login', (req, res) => {
        const credential = req.body
        // TODO: match the credential to create a logged-in user session
        res.json({
            "login": 'logged in',
            "_id": '6078a7f0d0845088bc831f32'
        })
    })

    /**
     * Create new seller profile for a user
     */
    app.get('/profile/:uid/sellerProfile', (req, res) => {
        // TODO
        res.json({})
    })

    /**
     * Create new buyer profile for a user
     */
    app.get('/profile/:uid/buyerProfile', (req, res) => {
        // TODO
        res.json({})
    })

    /**
     * Create new landlord profile for a user
     */
    app.get('/profile/:uid/landlordProfile', (req, res) => {
        // TODO
        res.json({})
    })

    /**
     * Create new tenant profile for a user
     */
    app.get('/profile/:uid/tenantProfile', (req, res) => {
        // TODO
        res.json({})
    })
}