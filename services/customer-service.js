const customerDao = require("./daos/customer-dao")

const createCustomer = (customer, callback) => {
    return customerDao.createCustomer(customer, callback)
}

const updateCustomer = (updatedCustomer, options, callback) => {
    return customerDao.updateCustomer(updatedCustomer["_id"], updatedCustomer, options, callback)
}

const findCustomerById = (uid, callback) => customerDao.findCustomerById(uid, callback)

const findCustomers = (callback) => customerDao.findCustomers(callback)

const deleteCustomer = (uid, callback) => customerDao.deleteCustomerById(uid, callback)

const findCustomerByPredicates = (predicates, callback) => customerDao.findCustomerByPredicates(predicates, callback)

module.exports = {
    createCustomer,
    updateCustomer,
    findCustomerById,
    findCustomers,
    deleteCustomer,
    findCustomerByPredicates
}