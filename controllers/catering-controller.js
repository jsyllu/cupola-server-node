/**
 * Controller that responsible for requesting data from the service and send it back to the view for catering
 */
const yelpService = require('../services/yelp-service')

module.exports = (app) => {
    /**
     * get resturants by location
     */
    app.get("/business/:location", (req, res) => {
        const location = req.params.location
        let data = yelpService.getBusinesses({location})
        data
        .then(json => res.send(json))
        .catch(e => {
            console.log(e.message)
            res.status(404).send(e.message).send();
        })
    })
    /**
     * get resturant detail by the id of the resturant
     */
    app.get("/business/detail/:id", (req, res) => {
        const id = req.params.id
        let data = yelpService.getBuisnessDetail(id)
        data
        .then(json => res.send(json))
        .catch(e => {
            res.status(404).send(e.message);
        })
    })
}