const customerDao = require("./daos/customer-dao")

const createCustomer = (customer, callback) => {
    return customerDao.createCustomer(customer, callback)
}

const updateCustomer = (updatedCustomer, callback) => {
    return customerDao.updateCustomer(updatedCustomer["_id"], updatedCustomer, callback)
}

const findCustomerById = (uid) => customerDao.findCustomerById(uid)

const findCustomers = () => customerDao.findCustomers()

const deleteCustomer = (uid) => customerDao.deleteCustomerById(uid)

module.exports = {
    createCustomer,
    updateCustomer,
    findCustomerById,
    findCustomers,
    deleteCustomer
}