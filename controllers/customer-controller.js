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
    * Update customer information, updated information encoded in the body
    */
    app.put("/profile/:uid", (req, res) => {
        // extract information from the request body
        const uid = mongoose.Types.ObjectId(req.params.uid)
        const updatedRecord = JSON.parse(JSON.stringify(req.body))
        updatedRecord["_id"] = uid
        // save the data to the database
        customerService.updateCustomer(updatedRecord, {new : true}, (err, data) => {
            if (!err) {
                return res.status(200).json(updatedRecord)
            } else 
                return res.status(404).send(err.message)            
        })
    })

    /**
    * Get the customer's detail information
    */
    app.get("/profile/:uid", (req, res) => {
         // retrieve the data from db using uid as the unique identifier
        const uid = mongoose.Types.ObjectId(req.params.uid)
        customerService.findCustomerById(uid, (err, data) => {
            if (!err)
                return res.status(200).json(data)
            else 
                return res.status(404).send(err.message)               
        })
    })

    /**
    * Get all customers info (only for admin)
    */
    app.get("/admin/profiles/:uid", (req, res) => {
        // retrieve the data from db using uid as the unique identifier
       const uid = mongoose.Types.ObjectId(req.params.uid)
       customerService.findCustomerById(uid, (err, data) => {
            if (err)
                return res.status(404).send(err.message) 
            else {
                if (data !== null && data["isAdmin"] === true) {
                    customerService.findCustomers((err, data) => {
                        if (!err)
                            return res.status(200).json(data)
                        else 
                            return res.status(404).send(err.message)                          
                    })
                } else
                    return res.status(404).send("Unauthorized Access")
            }                
       })
    })

    /**
     * Delete an customer based on its uid
     */
    app.delete("/profile/:uid", (req, res) => {
        const uid = mongoose.Types.ObjectId(req.params.uid)
        customerService.deleteCustomer(uid, (err, data) => {
            if (!err)
                res.status(200).json({
                    "ok" : data.ok,
                    "deletedCount:" : data.deletedCount
                })
            else 
                return res.status(404).send(err.message)             
        })
    })

    /**
    * URL to create a new customer, registration information encoded in the body
    * body pattern
    */
    app.post("/register", (req, res) => {
        // extract information from the request body
        const credentials = JSON.parse(JSON.stringify(req.body))
        // save the data to the database
        
        customerService.findCustomerByPredicates({
            email : credentials["email"]
        }, (err, actualCustomers) => {
            if (err)
                return res.status(404).send(err.message)
            else {
                if (actualCustomers.length > 0) {
                    return res.status(404).send("Email already exist")
                } else {
                    customerService.createCustomer(credentials, (err, data) => {
                        if (!err) {
                            req.session["profile"] = data
                            return res.status(200).json(data)
                        } else 
                            return res.status(404).send(err.message)
                    })
                }
            }
        })
    })

    /**
     * Delete the logged-in session
     */
    app.post('/profile/logout', (req, res) => {
        // TODO: delete the logged-in user session
        req.session['profile'] = undefined
        return res.status(200).json('logged out')
    })

    /**
     * Create a logged-in user session
     */
    app.post('/profile/login', (req, res) => {
        const credentials = req.body;
        customerService.findCustomerByPredicates({
            "email" : credentials.email,
            "password" : credentials.password
        }, (err, numOfMatches) => {
            if (err)
                return res.status(404).send(err.message)
            else {
                if (numOfMatches.length > 0) {
                    req.session['profile'] = numOfMatches[0]
                    return res.status(200).json(numOfMatches[0])                    
                }
                else
                    return  res.status(404).send("Authentication failed")
            }
        })
    })

}