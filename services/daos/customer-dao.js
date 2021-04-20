const customerModel = require("../../models/customer/customer-model")

const createCustomer = (customer, callback) => {
    customerModel.create(customer, (err, data) => {
        if (err) {
            console.log(`Error from createCustomer : ${err}`)
            callback(err)
        } else {
            callback(null, data)
        }     
    })
} 

const updateCustomer = (uid, updatedCustomer, options={new : true}, callback) => {
    customerModel.findByIdAndUpdate({"_id" : uid}, updatedCustomer)
    .exec((err, data) =>{
        if (err) {
            console.log(`Error from updateCustomer : ${err}`)
            callback(err)
        } else
            callback(null, data)
    })
}

/**
 * Find by predicates, an object which keys are field in the db
 * @param {Object} predicates 
 * @returns 
 */
const findCustomerByPredicates = (predicates, callback) => {
    customerModel.find(predicates)
    .exec((err, data) => {
        if (err) {
            console.log(`Error from findCustomerByPredicates : ${err}`)
            callback(err)
        } else
            callback(null, data)
    })
}

const findCustomerById = (uid, callback) => {
    customerModel.findOne({"_id" : uid})
    .exec((err, data) => {
        if (err) {
            console.log(`Error from findCustomerById : ${err}`)
            callback(err)
        } else
            callback(null, data)        
    })
}

const deleteCustomerById = (uid, callback) => {
    customerModel.deleteOne({"_id" : uid})
    .exec((err, data) => {
        if (err) {
            console.log(`Error from deleteCustomerById : ${err}`)
            callback(err)
        } else
            callback(null, data)           
    })
}

const findCustomers = (callback) => {
    customerModel.find()
    .exec((err, data) => {
        if (err) {
            console.log(`Error from findCustomers : ${err}`)
            callback(err)
        } else
            callback(null, data)              
    })
}

module.exports = {
    createCustomer,
    updateCustomer,
    findCustomerById,
    deleteCustomerById,
    findCustomers,
    findCustomerByPredicates
}

