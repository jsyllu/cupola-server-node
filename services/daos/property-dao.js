const propertyModel = require("../../models/property/property-model")

const createProperty = (property, callback) => {
    propertyModel.create(property, (err, data) => {
        if (err) {
            console.log(`Error from createProperty : ${err}`)
            callback(err)
        } else
            callback(null, data)      
    })
}

const findPropertyById = (pid, callback) => {
    propertyModel.findById(pid)
    .exec((err, data) => {
        if (err) {
            console.log(`Error from findPropertyById : ${err}`)
            callback(err)            
        } else
            callback(null, data)        
    })
}

const deletePropertyById = (pid) => {
    return propertyModel.deleteOne({"_id" : pid})
    .then(result => {
        return {
            "ok" : result.ok,
            "deletedCount:" : result.deletedCount
        }
    })
}

const updatePropertyById = (pid, updatedProperty, callback) => {
    propertyModel.findByIdAndUpdate({"_id" : pid}, updatedProperty)
    .exec((err, data) => {
        if (err) {
            console.log(`Error from updatePropertyById : ${err}`)
            callback(err)
        } else
            callback(null, data)        
    })
}

module.exports = {
    createProperty,
    findPropertyById,
    updatePropertyById,
    deletePropertyById
}
