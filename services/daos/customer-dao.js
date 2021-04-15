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

const updateCustomer = (uid, updatedCustomer, callback) => {
    customerModel.findByIdAndUpdate({"_id" : uid}, updatedCustomer)
    .exec((err, data) =>{
        if (err) {
            console.log(`Error from updateCustomer : ${err}`)
            callback(err)
        } else
            callback(null, data)
    })
}

const findCustomerById = (uid) => customerModel.findOne({"_id" : uid})

const deleteCustomerById = (uid) => customerModel.deleteOne({"_id" : uid})

const findCustomers = () => customerModel.find().exec()

module.exports = {
    createCustomer,
    updateCustomer,
    findCustomerById,
    deleteCustomerById,
    findCustomers
}

