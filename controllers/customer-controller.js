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
                res.status(200).send(data["_id"])
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
                res.status(200).send(data["_id"])
            else 
                res.status(404).send(err.message)            
        })
    })

    /**
    * Get the customer's detail information
    */
    app.get("/profile/:uid", (req, res) => {
         // retreieve the data from db using uid as the unique identifier
        const uid = mongoose.Types.ObjectId(req.params.uid)
        const data = customerService.findCustomerById(uid)
        data.then(d => res.json(d))
    })

    /**
    * Get all customers info (only for admin)
    */
    app.get("/admin/profiles/:uid", (req, res) => {
        // retreieve the data from db using uid as the unique identifier
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
}