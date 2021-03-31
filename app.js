require('dotenv').config();
const express = require('express')
const yelpService = require('./services/yelp-service')
const app = express()

// configure CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin')
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    next()
})

app.get("/hello", (req, res) => {
    res.send("Hello, World")
})

app.get("/resturant/:location", (req, res) => {
    const location = req.params.location
    try {
        console.log("yola")
        let data = yelpService.getBusinesses({location})
        data.then(json => res.send(json))
        
    } catch {
        res.send([])
    }
})

app.listen(3000)