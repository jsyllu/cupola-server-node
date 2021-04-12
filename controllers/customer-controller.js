/**
 * Controller for managing customer information
 * customer data UML
 *  - UID: String
    - firstName: String
    - lastName: String
    - phone: Integer
    - email: String
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
        console.log(data)
        // if success - send 200 status code back to the client
        res.sendStatus(200)
    })
    /**
     * Update customer information, updated information encoded in the body
     */
    app.put("/profile", (req, res) => {
        // extract information from the request body
        const data = JSON.parse(JSON.stringify(req.body))
        // save the data to the database
        console.log(data)
        // if success - send 200 status code back to the client
        res.sendStatus(200)
    })
    /**
     * Get the customer's detail information
     */
     app.get("/profile/:uid", (req, res) => {
         // retreieve the data from db using uid as the unique identifier
    })
}